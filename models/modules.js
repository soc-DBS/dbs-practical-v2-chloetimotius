const { PrismaClient, Prisma } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

// CREATE
module.exports.create = function create(code, name, credit) {
    return prisma.module.create({
        //TODO: Add data
        data: {
            modCode: code,
            modName: name,
            creditUnit: parseInt(credit)
        }
    }).then(function (module) {
        //TODO: Return module
        return module;
    }).catch(function (error) {
             // Prisma error codes: https://www.prisma.io/docs/orm/reference/errorreference#p2002 
            // TODO: Handle Prisma Error, throw a new error if module already exists     
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                // Unique constraint violation
                throw new Error(`The module ${code} already exists`);
            }
        }
        throw error;
    });
};

// UPDATE
module.exports.updateByCode = function updateByCode(code, credit) {
    return prisma.module.update({
        //TODO: Add where and data
        where: {
            modCode: code
        },
        data: {
            creditUnit: parseInt(credit)
        }
    }).then(function (module) {
        // Leave blank
        return module;
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // Prisma error codes: https://www.prisma.io/docs/orm/reference/errorreference#p2025 
        // TODO: Handle Prisma Error, throw a new error if module is not found  
            if (error.code === 'P2025') {
                // Record not found
                throw new Error(`The module ${code} was not found`);
            }
        }
        throw error;
    });
};

// DELETE
module.exports.deleteByCode = function deleteByCode(code) {
    return prisma.module.delete({
        //TODO: Add where 
        where: {
            modCode: code
        }
    }).then(function (module) {
        // Leave blank 
        return module;
    }).catch(function (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
                   // Prisma error codes: https://www.prisma.io/docs/orm/reference/errorreference#p2025 
        // TODO: Handle Prisma Error, throw a new error if module is not found     
            if (error.code === 'P2025') {
                throw new Error(`The module ${code} was not found`);
            }
        }
        throw error;
    });
};

// RETRIEVE ALL
module.exports.retrieveAll = function retrieveAll() {
    return prisma.module.findMany();
};

// RETRIEVE SINGLE
module.exports.retrieveByCode = function retrieveByCode(code) {
           // TODO: complete the entire function 
 
        // Prisma error codes: https://www.prisma.io/docs/orm/reference/errorreference#p2025 
        // TODO reminder: Handle Prisma Error, throw a new error if module is not found                              
        // TODO reminder: Return module at the end 
    return prisma.module.findUnique({
        where: {
            modCode: code
        }
    }).then(function (module) {
        if (!module) {
            throw new Error(`The module ${code} was not found`);
        }
        return module;
    }).catch(function (error) {
        throw error;
    });
};
