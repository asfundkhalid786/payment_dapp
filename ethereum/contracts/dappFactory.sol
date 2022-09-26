pragma solidity ^0.4.17;

contract CreateDappinstance {
    address[] public deployedDapps;

    function createDapp(uint BA, address cont, string PN) public {
        address newDapp = new dapp(BA, cont, msg.sender, PN);
        deployedDapps.push(newDapp);
    }

    function getDeployedDapps() public view returns (address[]) {
        return deployedDapps;
    }
}


contract dapp {
    struct Bill {
        uint invoiceNumber;
        string month;
        uint amount;
        bool complete;    
    }
    
    Bill[] public bill;
    uint public BidAmount;
    address public contractor;
    address public client;
    string public ProjectName;
    uint public estimatedQuarter;
    uint public whichno;
    uint public time;

// 1st function of initilization
      function dapp(uint BA, address cont, address clie, string PN) public{
        
        BidAmount = BA;
        contractor = cont; 
        client = clie;  
        ProjectName = PN;
    }
    //0 function

    function giveQA(uint estimatedQ) public {
        require(msg.sender == contractor); 
        estimatedQuarter = estimatedQ;
    }

 // 1.1 function of funding
    function funds() public payable{
        require(msg.sender == client);  
        require(msg.value >= estimatedQuarter);
       
        whichno = 0;
        time = block.timestamp;
    }  

// 2nd function of bill creation
    function createBill(uint invoiceNumber, string month, uint amount) public {
        require(msg.sender == client);
        require(this.balance >= amount);
        require(block.timestamp >= time + 20);
        require(amount >  5*BidAmount/100);
        Bill memory newBill = Bill({
            invoiceNumber: invoiceNumber,
            month: month,
            amount: amount,
            complete: false
        });
        bill.push(newBill);
        time = block.timestamp;
    }
// 3rd function of payment
    function pay(uint index) public{
        
        Bill storage Bbill = bill[index];

        require(msg.sender == contractor);
        require(!Bbill.complete);

        if(this.balance > estimatedQuarter/2) {           
            contractor.transfer(Bbill.amount);
            Bbill.complete = true;
            
        } else {
            contractor.transfer(Bbill.amount);
            Bbill.complete = true;
            client.transfer(this.balance);
            estimatedQuarter = 0;
        }     

    }

//retreve information

        function getSummary() public view returns (
      uint, uint, uint, string, address, address, uint
      ) {
        return (
          BidAmount,
          this.balance,
          bill.length,
          ProjectName,
          contractor,
          client,
          estimatedQuarter
        );
    }
    function getRequestsCount() public view returns (uint) {
        return bill.length;
    }

}