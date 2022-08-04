const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const op = db.Sequelize.Op;

const { validationResult } = require("express-validator");