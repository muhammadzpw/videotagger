export interface Label {
  label: string;
  time: number;
}

export interface State {
  filename: string;
  labels: Label[];
  last_time: number;
}

export interface DataUrl {
  filename: string;
  url: string;
}
