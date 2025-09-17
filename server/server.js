const express = require('express');
const cors = require('cors');
const path = require('path');
const oracledb = require('oracledb');

const app = express();
app.use(cors());
app.use(express.json());

// ejs 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.')); // .은 경로

const config = {
  user: 'SYSTEM',
  password: 'test1234',
  connectString: 'localhost:1521/xe'
};

// Oracle 데이터베이스와 연결을 유지하기 위한 전역 변수
let connection;

// 데이터베이스 연결 설정
async function initializeDatabase() {
  try {
    connection = await oracledb.getConnection(config);
    console.log('Successfully connected to Oracle database');
  } catch (err) {
    console.error('Error connecting to Oracle database', err);
  }
}

initializeDatabase();

// 엔드포인트
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/emp/list', async (req, res) => {
  const { deptNo } = req.query;
  let query = "";
  if(deptNo!= "" && deptNo != null){
    query = `WHERE E.DEPTNO = ${deptNo} `;
  }
  try {
    const result = await connection.execute(`SELECT E.*, DNAME FROM EMP E INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO ` + query + `ORDER BY SAL DESC`);
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        empList : rows
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/emp/delete', async (req, res) => {
  const { empNo } = req.query;

  try {
    await connection.execute(
      `DELETE FROM EMP WHERE EMPNO = :empNo`,
      [empNo],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/prof/list', async (req, res) => {
  const { } = req.query;
  try {
    const result = await connection.execute(`SELECT * FROM PROFESSOR`);
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        list : rows
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/prof/delete', async (req, res) => {
  const { profNo } = req.query;

  try {
    await connection.execute(
      `DELETE FROM PROFESSOR WHERE PROFNO = :profNo`,
      [profNo],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/prof/deleteAll', async (req, res) => {
  const { removeList } = req.query;
  console.log(removeList);
  let query = "DELETE FROM PROFESSOR WHERE PROFNO IN (";
  for(let i=0; i<removeList.length; i++){
    query += removeList[i];
    if(removeList.length-1 != i) query += ", ";
  }
  query += ")";

  try {
    await connection.execute(
      query,
      [],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/prof/info', async (req, res) => {
  const { profNo } = req.query;
  try {
    const result = await connection.execute(`SELECT P.*, PROFNO "profNo", NAME "name", ID "id", POSITION "position", PAY "pay" FROM PROFESSOR P WHERE PROFNO = ${profNo}`);
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows[0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/prof/update', async (req, res) => {
  const { name, id, position, pay, profNo } = req.query;

  try {
    await connection.execute(
      `UPDATE PROFESSOR SET NAME = :name, ID = :id, POSITION = :position, PAY = :pay WHERE PROFNO = :profNo`,
      [name, id, position, pay, profNo],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/emp/insert', async (req, res) => {
  const { empNo, ename, job, selectDept } = req.query;

  try {
    await connection.execute(
      `INSERT INTO EMP(EMPNO, ENAME, JOB, DEPTNO) VALUES (:empNo, :ename, :job, :selectDept)`,
      [empNo, ename, job, selectDept],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/emp/info', async (req, res) => {
  const { empNo } = req.query;
  try {
    const result = await connection.execute(
      `SELECT E.*, DNAME, EMPNO "empNo", ENAME "eName", JOB "job", E.DEPTNO "selectDept" `
      + `FROM EMP E `
      + `INNER JOIN DEPT D ON E.DEPTNO = D.DEPTNO `
      + `WHERE EMPNO = ${empNo}`
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows[0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/emp/update', async (req, res) => {
  const { ename, job, selectDept, empNo } = req.query;

  try {
    await connection.execute(
      `UPDATE EMP SET ENAME = :ename, JOB = :job, DEPTNO = :selectDept WHERE EMPNO = :empNo`,
      [ename, job, selectDept, empNo],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/emp/deleteAll', async (req, res) => {
  const { removeList } = req.query;
  console.log(removeList);
  let query = "DELETE FROM EMP WHERE EMPNO IN (";
  for(let i=0; i<removeList.length; i++){
    query += removeList[i];
    if(removeList.length-1 != i) query += ", ";
  }
  query += ")";

  try {
    await connection.execute(
      query,
      [],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/board/list', async (req, res) => {
  const { pageSize, offset } = req.query;
  
  try {
    const result = await connection.execute(
      `SELECT B.*, TO_CHAR(CDATETIME, 'YYYY-MM-DD') AS CDATE FROM TBL_BOARD B `
      + `OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });

    const count = await connection.execute(
      `SELECT COUNT(*) FROM TBL_BOARD`
    );
    // 리턴
    res.json({
        result : "success",
        boardList : rows,
        count : count.rows[0][0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/board/add', async (req, res) => {
  const { title, contents, userId, kind } = req.query;

  try {
    await connection.execute(
      `INSERT INTO TBL_BOARD VALUES (B_SEQ.NEXTVAL, :title, :contents, :userId, 0, 0, :kind, SYSDATE, SYSDATE)`,
      [ title, contents, userId, kind],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/board/info', async (req, res) => {
  const { boardNo } = req.query;
  try {
    const result = await connection.execute(
      `SELECT B.*, TO_CHAR(CDATETIME, 'YYYY-MM-DD') AS CDATE FROM TBL_BOARD B WHERE BOARDNO = ${boardNo}`
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows[0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

// ===================================================================================== //

// MINI PROJECT //

app.get('/login', async (req, res) => {
  const { userId, password } = req.query;
  let query = `SELECT * FROM TABLE_USER WHERE USERID = '${userId}' AND PASSWORD = '${password}'`;
  try {
    const result = await connection.execute(query);
    const columnNames = result.metaData.map(column => column.name);

    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/idcheck', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.json({
      result: "error",
      message: "No userId provided",
      exists: false
    });
  }
  
  try {
    const result = await connection.execute(`SELECT USERID FROM TABLE_USER WHERE USERID = :userId`,
       [userId]);
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        exists : rows.length > 0
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/signup', async (req, res) => {
  const { userId2, name, pwd, email } = req.query;

  try {
    await connection.execute(
      `INSERT INTO TABLE_USER VALUES (:userId2, :name, :pwd2, :email )`,
      [userId2, name, pwd, email],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/project/list', async (req, res) => {
  const { userId, keyword, sort, pageSize, offset } = req.query;
  try {
    let query = `
      SELECT P.*, 
             TO_CHAR(DUE_DATE, 'YYYY-MM-DD') AS DUEDATE, 
             TO_CHAR(CREATED_AT, 'YYYY-MM-DD') AS CREATEDDATE
      FROM TABLE_PROJECT P
      WHERE USERID = :userId
    `;
    // Parameters array for binding
    let params = [userId];

    // Add search filter if keyword exists
    if (keyword && keyword.trim() !== "") {
      query += `
        AND (
          LOWER(P.PROJECT_NAME) LIKE :kw
          OR LOWER(P.PRIORITY) LIKE :kw
          OR LOWER(P.STATUS) LIKE :kw
        )
      `;
      params.push(`%${keyword.toLowerCase()}%`);
      params.push(`%${keyword.toLowerCase()}%`);
      params.push(`%${keyword.toLowerCase()}%`);
    }

    // Sort by dates (latest/newest)
    if (sort == "latest"){
      query += ` ORDER BY P.DUE_DATE DESC`;
    } else if (sort == "oldest"){
      query += ` ORDER BY P.DUE_DATE ASC`;
    } else {
      query += ` ORDER BY P.CREATED_AT DESC`; 
    }

    // pagination
    query += ` OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`

    const result = await connection.execute(query, params);

    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    const count = await connection.execute(
      `SELECT COUNT(*) FROM TABLE_PROJECT WHERE USERID = :userId`,
      [userId]
    );
    // 리턴
    res.json({
        result : "success",
        list : rows,
        count : count.rows[0][0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/project/info', async (req, res) => {
  const { userId, projectNum } = req.query;
  try {
    const result = await connection.execute(
      `SELECT P.*, TO_CHAR(DUE_DATE, 'YYYY-MM-DD') AS DUEDATE, TO_CHAR(CREATED_AT, 'YYYY-MM-DD') AS CREATEDDATE FROM TABLE_PROJECT P  WHERE USERID = :userId AND PROJECT_NUM = :projectNum`,
      [userId, projectNum]
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows[0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/user/info', async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await connection.execute(
      `SELECT * FROM TABLE_USER WHERE USERID = :userId`,
      [userId]
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows[0]
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/task/info', async (req, res) => {
  const { projectNum } = req.query;
  try {
    const result = await connection.execute(
      `SELECT * FROM TABLE_TASK WHERE PROJECT_NUM = :projectNum`,
      [projectNum]
    );
    const columnNames = result.metaData.map(column => column.name);
    // 쿼리 결과를 JSON 형태로 변환
    const rows = result.rows.map(row => {
      // 각 행의 데이터를 컬럼명에 맞게 매핑하여 JSON 객체로 변환
      const obj = {};
      columnNames.forEach((columnName, index) => {
        obj[columnName] = row[index];
      });
      return obj;
    });
    res.json({
        result : "success",
        info : rows
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

app.get('/project/add', async (req, res) => {
  const { userId, projectName, dueDate, priority } = req.query;

  try {
      const result = await connection.execute(
      `INSERT INTO TABLE_PROJECT(PROJECT_NUM, USERID, PROJECT_NAME, DUE_DATE, CREATED_AT, UPDATED_AT, PRIORITY) ` 
      + `VALUES (PROJECT_SEQ.NEXTVAL, :userId, :projectName, :dueDate, SYSDATE, SYSDATE, :priority) `
      + `RETURNING PROJECT_NUM INTO :newProjectNum`, // <== returning the project number directly
      {
        userId,
        projectName,
        dueDate,
        priority,
        newProjectNum: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    const projectNum = result.outBinds.newProjectNum[0]; // <== retrieving the project number

    res.json({
        result : "success",
        projectNum
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.get('/task/add', async (req, res) => {
  const { projectNum, taskName } = req.query;

  try {
    await connection.execute(
      `INSERT INTO TABLE_TASK(TASK_NUM, PROJECT_NUM, TASK_NAME, STATUS, CREATED_AT, UPDATED_AT) `
       +`VALUES (TASK_SEQ.NEXTVAL, :projectNum, :taskName, 'Pending', SYSDATE, SYSDATE)`,
      {projectNum, taskName},
      { autoCommit: true }
    );
    res.json({ result: "success" });
  } catch (error) {
    console.error("Error inserting task", error);
    res.status(500).send("Error inserting task");
  }
});


app.get('/project/delete', async (req, res) => {
  const { projectNum } = req.query;

  try {
    await connection.execute(
      `DELETE FROM TABLE_TASK WHERE PROJECT_NUM = :projectNum`,
      [projectNum],
      { autoCommit: true }
    );
    await connection.execute(
      `DELETE FROM TABLE_PROJECT WHERE PROJECT_NUM = :projectNum`,
      [projectNum],
      { autoCommit: true }
    );
    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

app.post('/project/edit', async (req, res) => {
  const { projectInfo, taskInfo } = req.body;

  try {
    await connection.execute(
      `UPDATE TABLE_PROJECT `
      + `SET PROJECT_NAME = :projectName, `
      + `DUE_DATE = TO_DATE(:duedate, 'YYYY-MM-DD'), `
      + `PRIORITY = :priority, `
      + `UPDATED_AT = SYSDATE `
      + `WHERE PROJECT_NUM = :projectNum`,
      {
        projectName: projectInfo.PROJECT_NAME,
        duedate: projectInfo.DUEDATE,
        priority: projectInfo.PRIORITY,
        projectNum: projectInfo.PROJECT_NUM
      }
    );

    for (const task of taskInfo) {
      await connection.execute(
        `UPDATE TABLE_TASK `
        +`SET TASK_NAME = :taskName,` 
        +`STATUS =:status, `
        +`UPDATED_AT = SYSDATE `
        +`WHERE TASK_NUM = :taskNum`,
        {
          taskName: task.TASK_NAME,
          taskNum: task.TASK_NUM,
          status: task.STATUS
        }
      );
    }

    await connection.commit();

    res.json({
        result : "success"
    });
  } catch (error) {
    console.error('Error executing insert', error);
    res.status(500).send('Error executing insert');
  }
});

// 서버 시작
app.listen(3009, () => {
  console.log('Server is running on port 3009');
});
