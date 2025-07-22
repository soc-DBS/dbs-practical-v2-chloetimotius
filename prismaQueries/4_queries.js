const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const util = require('util');

function getAllStaff() {
	return prisma.staff.findMany({		
	})
}

/** Section A: Basic Queries */


function getHodInfo() {
	return prisma.department.findMany({
		//TODO: Implement the query
		select: {
			deptName: true, // Department Name
			hodApptDate: true, // HOD start date (appointment date)
		}

	});
}


function getDeptStaffingInfo() {
	return prisma.department.findMany({
		//TODO: Implement the query
		select: {
			deptCode: true, // Department Code
			noOfStaff: true, // Number of staff
		},
		orderBy: {
			noOfStaff: 'desc', //Sort by number of staff descending
		}

	});
}


/** Section B: Filtering Queries */


function getStaffofSpecificCitizenships() {
	return prisma.staff.findMany({
		//TODO: Implement the query
		where: {
			citizenship: {
				in: ['Hong Kong', 'Korea', 'Malaysia', 'Thailand'],
			
			},
		},
		select: {
			citizenship: true,
			staffName: true,
		},
		orderBy: {
			citizenship: 'asc',
		},
	});
}


function getStaffByCriteria1() {
	return prisma.staff.findMany({
		//TODO: Implement the query
		where: {
			maritalStatus: 'M',
			gender: 'M',
			OR: [
				{
					pay: {
						gte: 4000,
						lte: 7000,
					},
				},
				{
					pay: {
						gte: 2000,
						lte: 6000,
					},
				},
			],
		},
		select: {
			staffName: true,
			gender: true,
			pay: true,
			maritalStatus: true,
		},
		orderBy: [
			{ gender: 'asc' },
			{ pay: 'asc' },
		],
	});
}


/** Section C: Relation Queries */

async function getDepartmentCourses() {
    return prisma.department.findMany({
		//TODO: Implement the query
		orderBy: { deptName: 'asc' },
		select: {
			deptName: true,
			course: {
				select: {
					crseName: true,
					crseFee: true,
					labFee: true,
				},
			},
		},
		
    });
}

const getStaffAndDependents = async () => {
  return await prisma.staff.findMany({
    where: {
      staffDependent: {
        some: {}, // Only staff with at least one dependent
      },
    },
    orderBy: {
      staffName: 'asc',
    },
    select: {
      staffName: true,
      staffDependent: {
        select: {
          dependentName: true,
          relationship: true,
        },
      },
    },
  });
};


const getDepartmentCourseStudentDob = async () => {
  return await prisma.department.findMany({
    where: {
      course: {
        some: {
          student: {
            some: {},
          },
        },
      },
    },
    select: {
      deptName: true,
      course: {
        where: {
          student: {
            some: {},
          },
        },
        select: {
          crseName: true,
          student: {
            select: {
              studName: true,
              dob: true,
            },
            orderBy: {
              dob: 'desc',  // Descending DOB → oldest student first
            },
          },
        },
        orderBy: {
          crseName: 'asc',
        },
      },
    },
    orderBy: {
      deptName: 'asc',
    },
  });
};



async function main(argument) {
	let results;
	switch (argument) {
		case 'getAllStaff':
			results = await getAllStaff();
			break;
		case 'getHodInfo':
			results = await getHodInfo();
			break;
		case 'getDeptStaffingInfo':
			results = await getDeptStaffingInfo();
			break;
		case 'getStaffofSpecificCitizenships':
			results = await getStaffofSpecificCitizenships();
			break;
		case 'getStaffByCriteria1':
			results = await getStaffByCriteria1();
			break;
		case 'getDepartmentCourses':
			results = await getDepartmentCourses();
			break;
		case 'getStaffAndDependents':
			results = await getStaffAndDependents();
			break;
		case 'getDepartmentCourseStudentDob':
			results = await getDepartmentCourseStudentDob();
			break;
		default:
			console.log('Invalid argument');
			break;
	}
	results && console.log(util.inspect(results, { showHidden: false, depth: null, colors: true }));
}

main(process.argv[2]);
