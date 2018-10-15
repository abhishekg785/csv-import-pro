// @flow

import React from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@material-ui/core'

type resultType = {
  id?: number,
  age?: number,
  name?: string,
  address: string,
  team: string,
}

type Props = {
  result: Array<resultType>,
  classes: any,
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SearchResult({ result, classes }: Props) {
  if (_.isEmpty(result)) return null

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.age}</TableCell>
              <TableCell>{r.address}</TableCell>
              <TableCell>{r.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(SearchResult)
