const BASE_PATH = "/assets";

interface createdAt {
    year: number,
    month: number,
    day: number,
}

interface info {
    title: string,
    description: string,
    createdAt: createdAt,
    imgURL: string | null,
    imgAlt: string | null,
}


const infoLog: info[] = [
    {
        title: "/websiteを実装しました",
        description: "交流戦Botの/websiteコマンドを実装しました。/websiteコマンドを実行すると、このWebサービスのURLを表示します(!webでも可能)。",
        createdAt: {year: 2023, month: 7, day: 13},
        imgURL: `${BASE_PATH}/website_command.jpg`,
        imgAlt: 'The&nbsp;example&nbsp;use&nbsp;of&nbsp;/website&nbsp;command'
    },
    {
        title: "スマホ画面に対応しました",
        description: "スマホ画面に対応しました。スマホからでも表示が崩れずに閲覧できます。",
        createdAt: {year: 2023, month: 7, day: 11},
        imgURL: null,
        imgAlt: null,
    },
    {
        title: "Webサービスを開始しました",
        description: "交流戦BotのWebサービスを開始しました。戦績の閲覧ができます。",
        createdAt: {year: 2023, month: 7, day: 1},
        imgURL: `${BASE_PATH}/first.jpg`,
        imgAlt: 'The&nbsp;example&nbsp;use&nbsp;of&nbsp;LeaderBoard',
    }
];

export default infoLog;