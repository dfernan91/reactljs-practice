import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';
import logo from './logo.svg';
import './bootstrap.min.css';

class App extends Component {
  state = {
    citas: []
  }

  //Cuando la app carga
  componentDidMount(){
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  //cuando eliminamos o agregamos una nueva cita
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    // console.log(datos);
    const citas = [...this.state.citas, datos];

    this.setState({
      citas
    })

  }

  //eliminar las citas del state
  eliminarCita = id => {
    console.log(id);
    const citasActuales = [...this.state.citas];

    const citas = citasActuales.filter( cita => cita.id !== id)

    this.setState({citas})
  }
  render(){
    return (
      <div class="container">
        <Header 
        titulo='Administrador Pacientes Veterinarios' 
        />
        <div  className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
