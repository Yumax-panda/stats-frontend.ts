import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type GameResult = {
    idx: number;
    date: string;
    enemy: string;
    enemyScore: string;
    score: string;
    diff: number;
}

type APIQuery = {
    guildId: string | undefined;
    name: string | null | undefined;
    filter: string | undefined | null;
}


async function getGameResults(query: APIQuery): Promise<GameResult[]> {
    const {guildId, name, filter} = query;
    let url = `${process.env.REACT_API_URL}/guild/results/${guildId}`;
    const queries = [];

    if (name) {
        queries.push(name);
    }
    if (filter) {
        queries.push(filter);
    }
    if (queries.length > 0) {
        url += `?${queries.join('&')}`;
    }

    try {
        const response = await axios.get<GameResult[]>(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getTeamName(guildId: string | undefined): Promise<string | null> {

    if (!guildId) {
        return null;
    }

    const url = `${process.env.REACT_API_URL}/guild/name/${guildId}`;

    try {
        const response = await axios.get<string>(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default function LeaderBoard() {
    const nameRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLSelectElement>(null);
    const {guildId} = useParams<{guildId: string}>();
    const [teamName, setTeamName] = useState<string | null>(null);
    const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [query, setQuery] = useState<APIQuery>({guildId, name: null, filter: "all"})

    useEffect(() => {
        (async () => {
            const results = await getGameResults(query);
            const name = await getTeamName(guildId);
            setTeamName(name);
            setGameResults(results);
        })();
}, [query, guildId]);

    const changeHandler = () => {
        const name = nameRef.current?.value;
        const filter = filterRef.current?.value;
        setQuery({guildId, name, filter});
    }

    return (
        <div className="container">
            <div role="main" className="pb-3">

                <form className="mb-3" onChange={changeHandler}>
                    <div className="form-row form-group row">

                        <div className="col">
                            <label htmlFor="enemyName">チーム名</label>
                            <input type="text" className="form-control bg-dark text-light" id="enemyName" placeholder="チーム名" ref = {nameRef} />
                        </div>

                        <div className="col">
                            <label htmlFor="filter">フィルター</label>
                            <select className="form-control bg-dark text-light" id="filter" ref={filterRef}>
                                <option value="all">All</option>
                                <option value="win">Win</option>
                                <option value="lose">Lose</option>
                                <option value="draw">Draw</option>
                            </select>
                        </div>

                    </div>
                </form>

                {
                    (() => {
                        if (teamName) {
                            return (
                                <h3 className="text-center">{teamName}の戦績</h3>
                            );
                        }
                    })()
                }

                <div className="text-center d-none" id="resultTable">
                    <div className="table-responsive">
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
                                            <tr>
                                                <td>{result.idx+1}</td>
                                                <td>{result.enemy}</td>
                                                <td>{result.date}</td>
                                                <td>{result.score} - {result.enemyScore}</td>
                                                {(() => {
                                                    if (result.diff > 0) {
                                                        return <td className="text-win">Win (+{result.diff})</td>
                                                    };
                                                    if (result.diff < 0) {
                                                        return <td className="text-lose">Lose ({result.diff})</td>
                                                    }
                                                    return <td className="text-draw">Draw</td>
                                                })()}
                                            </tr>
                                        );
                                })};
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}