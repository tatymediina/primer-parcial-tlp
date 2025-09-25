class Configuracion{
  private static instancia: Configuracion

  static obtenerInstancia(instancia: Configuracion){
    if(!Configuracion.instancia){
      this.instancia = new Configuracion()
    }
    return this.instancia
  }

  set()
}

interface IInventario {
agregarEquipos(): void;
}

class InventarioViejo {
  private equipos: {nombre:string}[] = []
  public addItem(nombre:string): void {
    this.equipos.push({nombre})
  }
}



class AdaptadorInventario{
private adapter: InventarioViejo;

constructor(adapter: InventarioViejo) {
this.adapter = adapter;
}

agregarEquipos(nombre:string): void {
  this.adapter.addItem(nombre)
}
}

const invViejo = new InventarioViejo()
const adaptador =  new AdaptadorInventario(invViejo)
adaptador.agregarEquipos("Router Cisco", "" )



