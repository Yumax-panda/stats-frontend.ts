interface feature {
    title: string,
    description: string
}

const feature1: feature = {
    title: "交流戦の戦績閲覧",
    description: "交流戦の戦績を閲覧できます。チームのサーバーIDを入力することで戦績を確認できます。" +
        "相手のチーム名や勝敗で絞り込んで検索することが可能です。"
}

const feature2: feature = {
    title: "Botのアップデート情報の確認",
    description: "交流戦Botの更新履歴を確認することができます。"
}

const features: feature[] = [
    feature1,
    feature2
]

export default features;