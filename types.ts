
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  color: string;
}
