document.addEventListener('DOMContentLoaded', () => {
    const students = [];
    const residences = [];
    const requests = [];
    const employees = [];

    document.getElementById('addStudentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const gender = document.getElementById('studentGender').value;
        const student = new Student(name, studentId, gender);
        students.push(student);
        displayStudents();
        this.reset();
    });

    document.getElementById('assignResidenceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const studentId = document.getElementById('assignStudentId').value;
        const residenceName = document.getElementById('residenceName').value;
        const residenceType = document.getElementById('residenceType').value;
        const address = document.getElementById('residenceAddress').value;
        const sizeOrBedrooms = document.getElementById('sizeOrBedrooms').value;
        let residence;

        if (residenceType === 'DormRoom') {
            residence = new DormRoom(residenceName, address, sizeOrBedrooms);
        } else if (residenceType === 'Apartment') {
            residence = new Apartment(residenceName, address, sizeOrBedrooms);
        }

        residences.push(residence);

        const student = students.find(s => s.studentId === studentId);
        if (student) {
            student.assignResidence(residence);
            displayStudents();
        }
        this.reset();
    });

    document.getElementById('createRequestForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const description = document.getElementById('requestDescription').value;
        const submittedBy = document.getElementById('requestSubmittedBy').value;
        const student = students.find(s => s.name === submittedBy);

        if (student) {
            const request = new MaintenanceRequest(description, 'submitted', student);
            requests.push(request);
            displayRequests();
            this.reset();
        } else {
            alert('Student not found');
        }
    });

    document.getElementById('addEmployeeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('employeeName').value;
        const employeeId = document.getElementById('employeeId').value;
        const role = document.getElementById('employeeRole').value;
        const employee = new Employee(name, employeeId, role);
        employees.push(employee);
        displayEmployees();
        this.reset();
    });

    function displayStudents() {
        const output = document.getElementById('studentsOutput');
        output.innerHTML = '<h3>Students</h3>';
        students.forEach(student => {
            output.innerHTML += `<p>Name: ${student.name}, ID: ${student.studentId}, Gender: ${student.gender}, Residence: ${student.residence ? student.residence.name : 'None'}</p>`;
        });
    }

    function displayRequests() {
        const output = document.getElementById('requestsOutput');
        output.innerHTML = '<h3>Maintenance Requests</h3>';
        requests.forEach(request => {
            output.innerHTML += `<p>Description: ${request.description}, Status: ${request.status}, Submitted by: ${request.submittedBy.name}</p>`;
        });
    }

    function displayEmployees() {
        const output = document.getElementById('employeesOutput');
        output.innerHTML = '<h3>Employees</h3>';
        employees.forEach(employee => {
            output.innerHTML += `<p>Name: ${employee.name}, ID: ${employee.employeeId}, Role: ${employee.role}</p>`;
        });
    }
});