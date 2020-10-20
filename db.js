import pkg from 'sequelize'
const { Sequelize } = pkg
const db = new Sequelize('sqlite') 

export default db