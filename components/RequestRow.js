import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.pay(this.props.id).send({
      from: accounts[0],
    });
    Router.pushRoute(`/campaigns/${this.props.address}/bills`);
  };


  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;

    return (
      <Row disabled={request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.month}</Cell>
        <Cell>{web3.utils.fromWei(request.amount, "ether")}</Cell>
        <Cell>
          { request.complete ? null : (
          <Button color="green" basic onClick={this.onApprove}>
            Claim!
          </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
