import * as React from 'react';
import styles from './GetPaises.module.scss';
import type { IGetPaisesProps } from './IGetPaisesProps';
import { DefaultButton, Rating, RatingSize } from '@fluentui/react';
import axios from 'axios';



export default class GetPaises extends React.Component<IGetPaisesProps, { data: any }> {
  constructor(props: IGetPaisesProps) {
    super(props);
    this.state = {
      data: null
    };
  }

  public render(): React.ReactElement<IGetPaisesProps> {

    const handleClearClick = () => {
      this.setState({ data: null });
    };

    const handleClick = async () => {
      const data = await getExternalData();
      this.setState({ data });
    };
    const capital = this.props.capital;
    const URL = this.props.URL;
    const urlAPI = URL + capital;

    async function getExternalData(): Promise<any> {

      console.log(urlAPI);
      const response = await axios.get(urlAPI);
      return response.data;

    }

    return (
      <section className={styles.getPaises}>
        <div className={styles.welcome}>
          <h1>Lista de Paises</h1>
          <h3>Capital seleccionada: {this.props.capital.charAt(0).toUpperCase() + this.props.capital.slice(1)}</h3>
          // Pone en mayusculas la primera letra
          <DefaultButton text="Consultar API" onClick={handleClick} />
          <DefaultButton text="Borrar resultado" onClick={handleClearClick} />
        </div>

        {this.state.data && (
          <div>
            <br />
            <hr />
            <h2>Datos de la respuesta: </h2>

            {this.state.data.map((item: any) => (
              <div>
                <div><strong>Capital: </strong>{item.capital}</div>
                <div><strong>Pais: </strong>{item.name.common}</div>
                <div><strong>Nombre oficial: </strong>{item.name.official}</div>
                <div><strong>Bandera: </strong>{item.flag}</div>
                <div><strong>Región: </strong>{item.region}</div>
                <div><strong>Sub-región: </strong>{item.subregion}</div>
              </div>
            ))}

            <br />
            <hr />
          </div>
        )}
        <div>
          Puntuación:
          <Rating
            max={5}
            size={RatingSize.Large}
            defaultRating={1}
            ariaLabel="stars"
            ariaLabelFormat="{0} of {1} estrellas"
          />
        </div>


      </section>
    );
  }
}