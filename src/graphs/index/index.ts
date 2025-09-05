// src/graphs/index/index.ts

import StorageGraph from '../StorageGraph/StorageGraph';
import InflowGraph from '../InflowGraph/InflowGraph';
import ReleaseGraph from '../ReleaseGraph/ReleaseGraph';

export type GraphSpec = {
  id: string;
  title: string;
  Component: React.FC;
};

export const graphs: GraphSpec[] = [
  { id: 'storage', title: 'Storage Volume Over Time', Component: StorageGraph },
  { id: 'inflow',  title: 'Inflow (Daily)',           Component: InflowGraph },
  { id: 'release', title: 'Release (Daily)',          Component: ReleaseGraph },
];
