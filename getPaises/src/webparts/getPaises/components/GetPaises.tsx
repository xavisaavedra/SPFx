import * as React from 'react';
import styles from './GetPaises.module.scss';
import type { IGetPaisesProps } from './IGetPaisesProps';
import { DefaultButton, Rating, RatingSize, DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from '@fluentui/react';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import axios from 'axios';


interface IGetPaisesState {
  data: any;
  columns: any[];
}

export default class GetPaises extends React.Component<IGetPaisesProps, { data: any, columns: any }, IGetPaisesState> {
  constructor(props: IGetPaisesProps) {
    super(props);
    this.state = {
      data: null,
      columns: [
        { key: 'capital', name: 'Capital', fieldName: 'capital', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'name', name: 'País', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'officialName', name: 'Nombre oficial', fieldName: 'officialName', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'flag', name: 'Bandera', fieldName: 'flag', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'region', name: 'Región', fieldName: 'region', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'subregion', name: 'Sub-región', fieldName: 'subregion', minWidth: 100, maxWidth: 200, isResizable: true }
      ]
    };
  }
  private getItems(): any[] {
    if (!this.state.data) {
      return [];
    }

    return this.state.data.map((item: any) => ({
      capital: item.capital,
      name: item.name.common,
      officialName: item.name.official,
      flag: item.flag,
      region: item.region,
      subregion: item.subregion
    }));
  }


  private onRenderItemColumn(item: any, index: number | undefined, column: IColumn | undefined): JSX.Element {
    if (!column) {
      return <></>;
    }

    const fieldContent = item[column.fieldName as keyof typeof item] as string;

    switch (column.key) {
      case 'flag':
        return <Image src={fieldContent} width={50} height={30} imageFit={ImageFit.cover} />;
      default:
        return <span>{fieldContent}</span>;
    }
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
          {/* // Pone en mayusculas la primera letra */}
          <DefaultButton text="Consultar API" onClick={handleClick} />
          <DefaultButton text="Borrar resultado" onClick={handleClearClick} />
        </div>

        {this.state.data && (
          <div>
            <br />
            <hr />
            <h2>Datos de la respuesta: </h2>

            {this.state.data.map((item: any) => (

              <DetailsList
                items={this.getItems()}
                columns={this.state.columns}
                onRenderItemColumn={this.onRenderItemColumn}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
              />


              /*               <div>
                              <div><strong>Capital: </strong>{item.capital}</div>
                              <div><strong>Pais: </strong>{item.name.common}</div>
                              <div><strong>Nombre oficial: </strong>{item.name.official}</div>
                              <div><strong>Bandera: </strong>{item.flag}</div>
                              <div><strong>Región: </strong>{item.region}</div>
                              <div><strong>Sub-región: </strong>{item.subregion}</div>
                            </div> */
            ))
            }

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