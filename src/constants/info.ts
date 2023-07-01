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

const infoLog: info[] = [
    info1,
];

export default infoLog;