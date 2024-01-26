export interface Provision {
    energy: number,
    hydration: number,
    name: string,
    price: number,
    url: string
  }
  
  export interface Responses {
    final_energy?: number,
    final_hydration?: number,
    min_price?: number,
    provisions?: [Provision],
  }