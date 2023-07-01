import '../style/info.css';

import info from '../constants/info';

export default function Info() {
    return (
        <div className="container">
            <h2>お知らせ</h2>
            <ol className="info-list" reversed>
                {
                    info.map((info, index) => {
                        return (
                            <div className="info-container">
                                <li key={index}>
                                    <h3>{info.title}</h3>
                                    <div className="post">投稿日&nbsp;{info.createdAt.year}年{info.createdAt.month}月{info.createdAt.day}日(JST)</div>
                                    {
                                        (() => {
                                            if (info.imgURL && info.imgAlt) {
                                                return (
                                                    <img src={info.imgURL} alt={info.imgAlt} />
                                                );
                                            }
                                        })()
                                    }
                                    <p>{info.description}</p>
                                </li>
                            </div>
                        );
                        })
                }
            </ol>
        </div>
    );
}