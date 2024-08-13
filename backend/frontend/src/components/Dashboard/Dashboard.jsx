import React from "react";
import { Container, Grid, Card, Table, Segment } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure chart.js is auto-registered
import "../main.css"; // Custom CSS for the tree

const dummyData = {
  cards: [
    { title: "Card 1", description: "Description for card 1" },
    { title: "Card 2", description: "Description for card 2" },
    { title: "Card 3", description: "Description for card 3" },
    { title: "Card 4", description: "Description for card 4" },
  ],
  chartData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  },
  tableData: [
    {
      project: "Project A",
      team: "Team A",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      status: "Completed",
    },
    {
      project: "Project B",
      team: "Team B",
      startDate: "2023-02-01",
      endDate: "2023-07-01",
      status: "In Progress",
    },
    {
      project: "Project C",
      team: "Team C",
      startDate: "2023-03-01",
      endDate: "2023-08-01",
      status: "Pending",
    },
  ],
  treeData: {
    name: "Manager",
    children: [
      { name: "Employee 1" },
      { name: "Employee 2" },
      { name: "Employee 3" },
      { name: "Employee 4" },
      { name: "Employee 5" },
    ],
  },
};

const TreeNode = ({ node }) => {
  return (
    <div className="tree-node">
      <div className="node-content">
        <div className="node-image">
          <img src="https://via.placeholder.com/100" alt={node.name} />
        </div>
        <div className="node-name">{node.name}</div>
      </div>
      {node.children && (
        <div className="node-children">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Grid stackable>
        <Grid.Row columns={4}>
          {dummyData.cards.map((card, index) => (
            <Grid.Column key={index}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{card.title}</Card.Header>
                  <Card.Description>{card.description}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Grid stackable>
                <Grid.Row columns={2}>
                  <Grid.Column width={10}>
                    <Line data={dummyData.chartData} />
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Segment>
                      <div className="tree">
                        <TreeNode node={dummyData.treeData} />
                      </div>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Project</Table.HeaderCell>
                  <Table.HeaderCell>Team</Table.HeaderCell>
                  <Table.HeaderCell>Start Date</Table.HeaderCell>
                  <Table.HeaderCell>End Date</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {dummyData.tableData.map((row, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{row.project}</Table.Cell>
                    <Table.Cell>{row.team}</Table.Cell>
                    <Table.Cell>{row.startDate}</Table.Cell>
                    <Table.Cell>{row.endDate}</Table.Cell>
                    <Table.Cell>{row.status}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Dashboard;
