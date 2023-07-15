import '../style/about.css';

import features from '../constants/about';

const botURL = "https://discord.com/oauth2/authorize?client_id=1038322985146273853&permissions=854027660408&scope=bot%20applications.commands";


export default function About() {
    return (
        <div className="container">
            <div>
            <p>本サイトは、Discord上で動く<a href={botURL}>交流戦Bot</a>のサービスの一部を提供しています。</p>
            </div>

            <ol type="I" className="feature" id="feature">
                <li>
                    <h2>機能</h2>
                    <ol className="feature-list">
                        {
                            features.map((feature, index) => {
                                return (
                                    <li key={index}>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </li>
                                );
                            })
                        }
                    </ol>
                </li>

                <li>
                    <h2>免責事項</h2>
                    <p>以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
                    <ul>
                        <li>本サービスにかかるシステムの保守または点検を行う場合</li>
                        <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                        <li>サーバーまたは通信回線等が事故により停止した場合</li>
                        <li>その他、当グループが本サービスの提供が困難と判断した場合</li>
                    </ul>
                    <p>本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。さらに、当サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                    ユーザーが当サービスを利用して第三者に危害を加えた場合については、基本的に当グループは一切の責任を負いません。
                    </p>
                </li>

                <li>
                    <h2>問い合わせ</h2>
                    <p>交流戦Botや本サイトに関するお問い合せは以下までお願いします。</p>
                    <ul>
                        <li>Discord:&nbsp;azure2704</li>
                    </ul>
                </li>
            </ol>
        </div>
    );
}