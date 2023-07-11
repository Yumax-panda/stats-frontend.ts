import '../style/leaderboard.css';

import axios from 'axios';
import { useState } from 'react';

const URL = process.env.REACT_APP_API_URL;

interface GameResult {
    idx: number;
    date: string;
    enemy: string;
    enemyScore: string;
    score: string;
    diff: number;
}

interface Payload {
    data: GameResult[];
    total: number;
    name: string | null;
}

interface APIQuery {
    guildId: string | undefined;
    enemyName: string | null | undefined;
    filter: string | undefined;
    skip: number;
}


export default function LeaderBoard() {
    const [gameResults, setGameResults] = useState<Payload>({data: [], total: 0, name: null});
    const [query, setQuery] = useState<APIQuery>({guildId: "", enemyName: null, filter: "all", skip: 0});
    const [currentPage, setCurrentPage] = useState<number>(1);

    const update = async (_query: APIQuery = query) => {
        const results =  await getGameResults(_query);
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

    const changePage = async (
        page: number,
        total: number,
        _query: APIQuery = query,
    ): Promise<void> => {
        const maxPage = Math.ceil(total / 50);
        if (page < 1 || page > maxPage) {
            return;
        }
    const requestQuery = {..._query, skip: page -1};
    await update(requestQuery);
    }

    const getGameResults =  async(query: APIQuery) : Promise<Payload> => {
        const {guildId, enemyName, filter, skip} = query;
        let url = `${URL}/api/guild/results/${guildId}?skip=${skip}`;

        if (enemyName) {
            url += `&name=${enemyName}`;
        }
        if (filter) {
            url += `&filter=${filter}`;
        }

        const payload = await axios.get<Payload>(url)
            .then((response) => {
                return response.data;
            }
        ).catch((error) => {
            console.error(error);
            return {data: [], total: 0, name: null};
        }
        );
        console.log(payload);
        setCurrentPage(skip + 1);
        return payload;
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
                        if (gameResults.name) {
                            return (
                                <h3 className="col-6 text-center">{gameResults.name}の戦績&nbsp;({gameResults.total}件)</h3>
                            );
                        }
                    })()
                }

                </div>

                <div className="text-center d-none" id="resultTable">
                    <div className="table-responsive">
                        {
                            (() => {
                                if (gameResults.data.length > 0) {
                                    return (
                                        <div>
                                            <table className="table table-striped table-dark table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>チーム名</th>
                                                        <th>対戦日</th>
                                                        <th>自チーム&nbsp;-&nbsp;相手チーム</th>
                                                        <th>結果</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="resultTableBody">
                                                    {
                                                        gameResults.data.map((result) => {
                                                            return (
                                                                <tr key={result.idx}>
                                                                    <td className="idx">{result.idx+1}</td>
                                                                    <td>{result.enemy}</td>
                                                                    <td>{result.date}</td>
                                                                    <td>{result.score}&nbsp;-&nbsp;{result.enemyScore}</td>
                                                                    {(() => {
                                                                        if (result.diff > 0) {
                                                                            return (
                                                                                <td className="text-win">Win&nbsp;(+{result.diff})</td>
                                                                            );
                                                                        };
                                                                        if (result.diff < 0) {
                                                                            return (
                                                                                <td className="text-lose">Lose&nbsp;({result.diff})</td>
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
                                        </div>
                                    );
                                } else if (gameResults.data.length === 0 && query.guildId !== "") {
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
                    {
                        (() => {
                            if (gameResults.data.length > 0) {
                                return (
                                    <div>
                                        <span className="form-inline">
                                            Page&nbsp;
                                            <input type="number" className="form-control bg-dark text-light" id="page-num-form" value={currentPage}
                                                min={1} max={Math.ceil(gameResults.total/50)}
                                                onChange={
                                                    async (event) => {
                                                        const page = Number(event.target.value);
                                                        await changePage(page, gameResults.total);
                                                    }
                                                }/>
                                            &nbsp;of&nbsp;
                                            <span id="maxPageNumber">{Math.ceil(gameResults.total/50)}</span>
                                        </span>
                                            <ul className="pagination pagination-dark justify-content-end">
                                                <li className="page-item"><button className="page-link form-control bg-dark text-light" id="indicator-prev" disabled={!(currentPage > 1)}
                                                    onClick={
                                                        async (event) => {
                                                            await changePage(currentPage-1, gameResults.total);
                                                        }
                                                    }>Previous</button>
                                                </li>
                                                    <li className="page-item"><button className="page-link form-control bg-dark text-light" id="indicator-next" disabled={!(currentPage < Math.ceil(gameResults.total/50))}
                                                    onClick={
                                                        async (event) => {
                                                            await changePage(currentPage+1, gameResults.total);
                                                        }
                                                    }>Next</button>
                                                </li>
                                            </ul>
                                    </div>
                                );
                            }
                        })()
                    }
                </div>

            </div>
        </div>
    );
}