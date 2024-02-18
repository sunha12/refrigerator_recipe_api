/** TEST SERVER */
module.exports = {
    host: '211.45.170.191',
    port: '33306',
    user: "codingduo",
    password: "Codingduo12*",
    database: "refrigerator_recipe",
    connectionLimit: 100, //동시 연결 제한
    waitForConnections: true, //연결 풀이 모두 사용중일떄 새로운 풀 대기하는지에 대한 여부. (true : 대기함)
    charset: 'utf8mb4', // 데이터베이스 문자셋
    multipleStatements: true, //하나의 쿼리셋에 여러개의 sql문을 포함할 수 있는지
};
