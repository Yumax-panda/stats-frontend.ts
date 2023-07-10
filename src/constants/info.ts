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

const info1: info = {
    title: "Webサービスを開始しました",
    description: "交流戦BotのWebサービスを開始しました。戦績の閲覧ができます。",
    createdAt: {year: 2023, month: 7, day: 1},
    imgURL: `${BASE_PATH}/first.jpg`,
    imgAlt: 'The&nbsp;example&nbsp;use&nbsp;of&nbsp;LeaderBoard',
}

const info2: info = {
    title: "スマホ画面に対応しました",
    description: "スマホ画面に対応しました。スマホからでも表示が崩れずに閲覧できます。",
    createdAt: {year: 2023, month: 7, day: 11},
    imgURL: null,
    imgAlt: null,
}

const infoLog: info[] = [
    info2,
    info1,
];

export default infoLog;