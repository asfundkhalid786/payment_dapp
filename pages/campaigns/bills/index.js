import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
   
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.bill(index).call();
        })
    );

    return { address, requests, requestCount };
  }

  renderRows() {
    return this.props.requests.map((Bbill, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={Bbill}
          address={this.props.address}
         
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Approved Bills</h3>
        <Link route={`/campaigns/${this.props.address}`}>
          <a>
            Back
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Invoice Number</HeaderCell>
              <HeaderCell>Month</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Redeem</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <Link route={`/campaigns/${this.props.address}/bills/new`}>
          <a>
            <Button primary floated="right" style={{ margintop: 10 }}>
              Generate Bill</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
