var pool = require ("./connection");

module.exports.getAll =async function(){

    try{
    const sql= "SELECT * FROM PACIENTE";
    const paciente = await pool.query (sql);
    return {status:200, data:paciente};
} catch(err) {
    console.log(err);
    return {status:500, data: err}
}
}
