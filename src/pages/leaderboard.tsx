import '../style/leaderboard.css';

import axios from 'axios';
import { useState } from 'react';

const URL = process.env.REACT_APP_API_URL;

type GameResult = {
    idx: number;
    date: string;
    enemy: string;
    enemyScore: string;
    score: string;
    diff: number;
}

type Payload = {
    data: GameResult[];
}

type APIQuery = {
    guildId: string | undefined;
    enemyName: string | null | undefined;
    filter: string | undefined;
}

type NameResponse = {
    name: string;
}


async function getGameResults(query: APIQuery) : Promise<GameResult[]> {
    const {guildId, enemyName, filter} = query;
    let url = `${URL}/api/guild/results/${guildId}`;
    const queries = [];

    if (enemyName) {
        queries.push(`name=${enemyName}`);
    }
    if (filter) {
        queries.push(`filter=${filter}`);
    }
    if (queries.length > 0) {
        url += `?${queries.join('&')}`;
    }

    const results = await axios.get<Payload>(url)
        .then((response) => {
            return response.data.data;
        }
    ).catch((error) => {
        console.error(error);
        return [];
    }
    );
    console.log(results);
    return results;
}

async function getTeamName(guildId: string | undefined): Promise<string | null> {

    if (!guildId) {
        return null;
    }

    const url = `${URL}/api/guild/name/${guildId}`;

    const name = await axios.get<NameResponse>(url)
        .then((response) => {
            return response.data.name;
        }
    ).catch((error) => {
        console.error(error);
        return null;
    }
    );
    return name;
}

export default function LeaderBoard() {
    const [teamName, setTeamName] = useState<string | null | undefined>(null);
    const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [query, setQuery] = useState<APIQuery>({guildId: "", enemyName: null, filter: "all"});

    // TODO: - 戦績が存在しない場合はアラートを出す
    //       - ファイル出力のURLを表示
    const update = async (_query: APIQuery = query) => {
        const results =  await getGameResults(_query);
        const name = await getTeamName(_query.guildId);
        setTeamName(name);
        setGameResults(results);
    }

    const handleEvent = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): Promise<void> => {
        const {id, value} = event.target;
        const newQuery = {...query, [id]: value};
        console.log(newQuery);
        await update(newQuery);
        console.log(gameResults);
        setQuery(newQuery);
    }



    return (
        <div className="container">
            <div role="main" className="pb-3">

                <form className="mb-3">
                    <div className="form-row form-group row">

                        <div className="col-4">
                            <label htmlFor="guildId">サーバーID</label>
                            <input type="text" className="form-control bg-dark text-light" id="guildId" onChange={
                                async (event) => {await handleEvent(event);}
                            } autoComplete="off" />
                        </div>

                        <div className="col-4">
                            <label htmlFor="enemyName">チーム名</label>
                            <input type="text" className="form-control bg-dark text-light" id="enemyName" onChange={
                                async (event) => {await handleEvent(event);}
                            } autoComplete="off"
                            placeholder="絞り込み"/>
                        </div>

                        <div className="col-4">
                            <label htmlFor="filter">フィルター</label>
                            <select className="form-control bg-dark text-light" id="filter" onChange={
                                async (event) => {await handleEvent(event);}
                            }>
                                <option value="all">All</option>
                                <option value="win">Win</option>
                                <option value="lose">Lose</option>
                                <option value="draw">Draw</option>
                            </select>
                        </div>

                    </div>
                </form>

                <div className="justify-content-center">

                {
                    (() => {
                        if (teamName) {
                            return (
                                <h3 className="col-6 text-center">{teamName}の戦績 ({gameResults.length}件)</h3>
                            );
                        }
                    })()
                }

                </div>

                <div className="text-center d-none" id="resultTable">
                    <div className="table-responsive">
                        {
                            (() => {
                                if (gameResults.length > 0) {
                                    return (
                                        <table className="table table-striped table-dark table-sm">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>チーム名</th>
                                                    <th>対戦日</th>
                                                    <th>自チーム - 相手チーム</th>
                                                    <th>結果</th>
                                                </tr>
                                            </thead>
                                            <tbody id="resultTableBody">
                                                {
                                                    gameResults.map((result) => {
                                                        return (
                                                            <tr key={result.idx}>
                                                                <td className="idx">{result.idx+1}</td>
                                                                <td>{result.enemy}</td>
                                                                <td>{result.date}</td>
                                                                <td>{result.score} - {result.enemyScore}</td>
                                                                {(() => {
                                                                    if (result.diff > 0) {
                                                                        return (
                                                                            <td className="text-win">Win (+{result.diff})</td>
                                                                        );
                                                                    };
                                                                    if (result.diff < 0) {
                                                                        return (
                                                                            <td className="text-lose">Lose ({result.diff})</td>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <td className="text-draw">Draw</td>
                                                                    );
                                                                })()}
                                                            </tr>
                                                        );
                                                })}
                                            </tbody>
                                        </table>
                                    );
                                } else if (gameResults.length === 0 && query.guildId !== "") {
                                    return (
                                        <h3 className="text-center">戦績が存在しません</h3>
                                    );
                                } else {
                                    return (
                                        <h3 className="text-center">サーバーIDを入力してください</h3>
                                    );
                                }
                        })()
                    }
                    </div>
                </div>

            </div>
        </div>
    );
}