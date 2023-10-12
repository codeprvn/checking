import React from 'react'
import { useState } from 'react';
import SharedTable from '../shared component/SharedTable'

const columns = [
  {
    id: 'position',
    label: 'S No',
  },
  { id: 'channelName', label: 'Channel Name' }, { id: 'maxPlayers', label: 'Max Players' },
  {
    id: 'minBuyIn',
    label: 'Min BuyIn', format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'maxBuyIn',
    label: 'maxBuyIn', format: (value) => value / 10000
  },
  {
    id: 'smallBlind',
    label: 'Small Blind',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'isActive',
    label: 'is Active',
    format: (value) => value.toString()
  },
  {
    id: 'bigBlind',
    label: 'Big Blind',
  },

];

const actionButton = [{ name: 'Edit' }, { name: 'view' }]
const actionHandler = (name, id) => { console.log('thisn', name, 'data', id) }

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    "_id": "On4iK",
    "channelName": "EV3",
    "maxPlayers": 6,
    "minBuyIn": 1000,
    "maxBuyIn": 50000,
    "isActive": true,
    "smallBlind": 100,
    "isMasterTable": true,
    "channelId": "On4iK",
    "bigBlind": 200,
    "position": 1
  },
  {
    "_id": "PKvHC",
    "channelName": "EV2",
    "maxPlayers": 6,
    "minBuyIn": 1000,
    "maxBuyIn": 50000,
    "isActive": true,
    "smallBlind": 100,
    "isMasterTable": true,
    "channelId": "PKvHC",
    "bigBlind": 200,
    "position": 2
  },
  {
    "_id": "yKKGl",
    "channelName": "EV1",
    "maxPlayers": 6,
    "minBuyIn": 1000,
    "maxBuyIn": 50000,
    "isActive": true,
    "smallBlind": 100,
    "isMasterTable": true,
    "channelId": "yKKGl",
    "bigBlind": 200,
    "position": 3
  }
]

const DummyData = () => {

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  return (<>
    <div>GameManagement</div>
    <SharedTable columns={columns} rows={rows} page={page} totalpage={100} handleChangePage={handleChangePage} isAction={true} actionButton={actionButton}
      actionHandler={actionHandler} />
  </>
  )
}

export default DummyData