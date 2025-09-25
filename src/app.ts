// ! Singleton

class Configuracion {
  private static instancia: Configuracion;

  static obtenerInstancia(instancia: Configuracion) {
    if (!Configuracion.instancia) {
      this.instancia = new Configuracion();
    }
    return this.instancia;
  }

  set();
}

// ! Adapter

interface IInventario {
  agregarEquipos(): void;
}

class InventarioViejo {
  private equipos: { nombre: string }[] = [];
  public addItem(nombre: string): void {
    this.equipos.push({ nombre });
  }
}

class AdaptadorInventario {
  private adapter: InventarioViejo;

  constructor(adapter: InventarioViejo) {
    this.adapter = adapter;
  }

  agregarEquipos(nombre: string): void {
    this.adapter.addItem(nombre);
  }
}

const invViejo = new InventarioViejo();
const adaptador = new AdaptadorInventario(invViejo);
adaptador.agregarEquipos("Router Cisco", "");


// ! Observador:completado
interface Observador {
  update(message: string): void;
}
class Soporte implements Observador {
  update(message: string): void {
    console.log(`Soporte Notificado ${message}`);
  }
}

class Equipo {
  private observadores: Observador[] = [];
  constructor(
    public marca: string,
    public tipo: string,
    private status: string
  ) {}

  agregarObservador(o: Observador) {
    this.observadores.push(o);
  }

  cambiarEstado(nuevoEstado: string) {
    this.status = nuevoEstado;
    this.notificar();
  }

  notificar() {
    this.observadores.forEach((o) => o.update(this.status));
  }
}

const soporte = new Soporte();
const equipo = new Equipo("Notebook Hp", "Portatil", "Disponible");
equipo.agregarObservador(soporte)
equipo.cambiarEstado("En reparación")

// ! Factory: completado

class Servidor{
  constructor(public tipo:string, public marca:string, public ram:string, public procesador:string){}
  public detalles(){
    return `Tipo ${this.tipo}, Nombre: ${this.marca}, RAM: ${this.ram}, Procesador: ${this.procesador}`
  }

}
class EquipoFactory {
  crearEquipo(tipo:string, marca:string, ram:string, procesador:string){
    if(tipo=="Servidor"){
      return new Servidor(tipo, marca, ram, procesador)
    } else {
      console.log("Objeto no soportado")
    }

  }
}


const factory = new EquipoFactory()
const server = factory.crearEquipo("Servidor", "Dell PowerEdge", "32gb", "Xeon")
console.log(server?.detalles())
