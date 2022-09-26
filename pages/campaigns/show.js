import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";


class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      BidAmount: summary[0],
      balance: summary[1],
      billsCount: summary[2],
      ProjectName: summary[3],
      contractor: summary[4],
      client: summary[5],  
      estimatedQuarter: summary[6]

    };
  }

  renderCards() {
    const {
      BidAmount,
      balance,
      billsCount,
      ProjectName,
      contractor,
      client, 
      estimatedQuarter,
    } = this.props;

    const items = [
      {
        header: ProjectName,
        meta: "Project Title",
        description:
          "this is the name of the project",
        style: { overflowWrap: "break-word" },
      },
      {
        header: BidAmount,
        meta: "Bid Amount of the project (wei)",
        description:
          "To create a bill work of 5% of the bid amount must be executed",
      },
      {
        header: client,
        meta: "The owner wallet address",
        description:
          "The client will lock the amount in the dapp and will create bills",
          style: { overflowWrap: "break-word" },
      },
      {
        header: contractor,
        meta: "The contractor wallet address ",
        description:
          "The contractor will execute the work as per specifications and will claim the bill amount form the Dapp",
          style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(estimatedQuarter, "ether"),
        meta: "Amount of Estimated Quarter",
        description:
          "This is the amount given by the contractor to  be completed in this quarter",
      },

      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Amount Locked",
        description:
          "Money locked inside the dapp.",
      },
      {
        header: billsCount,
        meta: "Bills generated",
        description:
          "Number of billz generated",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Project Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/bills`}>
                <a>
                  <Button primary>View Bills</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>

    );
  }
}

export default CampaignShow;
