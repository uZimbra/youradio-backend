interface IMusicEntity {
  id: string;
  name: string;
  duration: number;
  coverUri: string;
  musicKey: string;
  size: number;
  type: string;
  createdAt: Date;
}

export { IMusicEntity };
