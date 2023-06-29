let inputLoanAmount;
let inputInterestRate;
let inputYearNumber;
let totalAmount;

inputLoanAmount = parseInt(prompt("Hãy nhập số tiền vay."));
inputInterestRate = (parseInt(prompt("Hãy nhập tỷ lệ % lãi suất theo năm.")));
inputYearNumber = parseInt(prompt("Hãy nhập số năm sẽ gửi."));
totalAmount=inputLoanAmount*(1+(inputInterestRate/100))*inputYearNumber;


document.write("Sau "+inputYearNumber+" năm số tiền cả gốc lẫn lãi là: "+totalAmount);