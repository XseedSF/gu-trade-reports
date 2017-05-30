import React from 'react'
import { HeaderContainer, FiltersContainer } from './containers'

const App = () => (
  <div>
    <HeaderContainer />
    <FiltersContainer />
  </div>
)
export default App;

// import React, { Component } from 'react';
// // import '../public/content/App.css';
// // import '../public/content/fixed-data-table.css';
// import {loadFormAndCompletedForms} from './lib/services.js';
// import FormHeader from './Components/FormHeader.js'
// import QuestionDashboard from './Components/QuestionDashboard.js'
// import QuestionTable from './Components/QuestionTable.js'
// import TableExample from './Components/TableExample.js'

// class App extends Component {
//   // state = {
//   //   formName: '',
//   //   questions: [],
//   //   forms: [],
//   //   filters: [] //Ejemplo: {questionId: 1, questionType: "MO", value: 1}
//   // }
//   constructor(props) {
//     super(props);
//     this.state = {
//       formName: '',
//       questions: [],
//       forms: [],
//       filters: [] //Ejemplo: {questionId: 1, questionType: "MO", value: 1}
//     };
//   }
//   componentWillMount() {
    
//     let forms = this.props.form.completedForms.map( f => {
//       f.questions = f.questions.sort((a,b) => a.Id - b.Id);
//       return f;
//     })
//     let questions = this.props.form.questions.sort((a,b) => a.Id - b.Id);

//     this.setState({forms, questions, formName:this.props.form.name});
//     /*loadFormAndCompletedForms()
//       .then(form => {

//         let forms = form.completedForms.map( f => {
//             f.questions = f.questions.sort((a,b) => a.Id - b.Id);
//             return f;
//           })
//         let questions = form.questions.sort((a,b) => a.Id - b.Id);

//         this.setState({forms, questions, formName:form.name});
//       })*/

//     /*loadQuestions()
//       .then(questions => {
//         questions = questions.sort((a,b) => a.Id - b.Id);
//         this.setState({questions})
//       })

//     loadCompletedForms()
//       .then(forms => {
//         forms.map( f => {
//           f.questions = f.questions.sort((a,b) => a.Id - b.Id);
//           return f;
//         })
//         this.setState({forms})
//       })*/
//     }
//     cleanSelection() {
//       this.setState({filters: [] });
//     }
//     handleFilter(question, value){
//       console.log('handleFilter, value: ' + value + ' question: ' + question.Id);

//       let currentFilters = this.state.filters;
//       let indexFilter = currentFilters.findIndex(filter => filter.questionId === question.Id);

//       if(question.Type === 'MO') {
//         let newFilter = {questionId: question.Id, questionType: question.Type, values: [value]};

//         if(indexFilter === -1) {
//           currentFilters = [...this.state.filters, newFilter];     
//         }
//         else {
//         //Como es multiple opcion, tiene mas de un valor posible, si ya esta lo sacamos
//         let filter = currentFilters[indexFilter];
//         let indexOfValue = filter.values.indexOf(value);
//         if(indexOfValue !== -1) {
//           //Si ya estaba el valor, lo sacamos
//           filter.values = [
//           ...filter.values.splice(0,indexOfValue),
//           ...filter.values.splice(indexOfValue+1)
//           ];
//           //Si no tiene mas valores, sacamos el filtro
//           if(filter.values.length === 0){
//             currentFilters = [
//             ...this.state.filters.splice(0,indexFilter),
//             ...this.state.filters.splice(indexFilter+1)
//             ];
//           }
//         }
//         else {
//           //Si no estaba el valor, lo agregamos
//           filter.values = [...filter.values, value];
//           currentFilters = [
//           ...this.state.filters.splice(0,indexFilter),
//           filter,
//           ...this.state.filters.splice(indexFilter+1)
//           ];
//         }    
//       }
//     }
//     else if(question.Type === 'YN'){
//       //Si es si o no, no mantenemos una lista de valores, solo uno
//       let newFilter = {questionId: question.Id, questionType: question.Type, values: [value]};
//       if(indexFilter === -1) {
//         currentFilters = [...this.state.filters, newFilter];     
//       }
//       else {
//         //Si el valor es el mismo, lo sacamos
//         if(currentFilters[indexFilter].values[0] === value){
//           currentFilters = [
//           ...this.state.filters.splice(0,indexFilter),              
//           ...this.state.filters.splice(indexFilter+1)
//           ];
//         }
//         else {
//         //Si no es el mismo, lo agregamos
//         currentFilters = [
//         ...this.state.filters.splice(0,indexFilter),
//         newFilter,
//         ...this.state.filters.splice(indexFilter+1)
//         ];
//       } 
//     }
//   }

//   this.setState({
//     filters: currentFilters
//   })

//     /*
//     let currentFilters = this.state.filters.filter(f => { 
//       if(f.questionId === question.id && f.value === value) 
//         return false;
//       else
//         return true; 
//     });
//     let updatedFilters = [...currentFilters, newFilter];
//     this.setState({
//         filters: updatedFilters
//       })*/
//     }

//     render() {
//       const formName = this.state.formName;
//       return (
//         <div className='App'>
//         <FormHeader> Formulario: {formName} </FormHeader>
//         <div className='site-description'>
//         <p> Puedes aplicar filtros seleccionando barras o sectores de las gráficas, y estos se irán acumulando. 
//         Al aplicar un filtro sobre una pregunta, la gráfica de esta pregunta no será filtrada.
//         En el caso de las gráficas de barras puedes elegir más de una opción para incluir más respuestas.
//         </p>
//         <button className='button-clean-filter' onClick={this.cleanSelection.bind(this)}> Limpiar filtros </button>
//         </div>
//         <QuestionDashboard questions={this.state.questions}
//         forms={this.state.forms}
//         filters={this.state.filters} 
//         handleFilter={this.handleFilter.bind(this)}/>
//         {/*<QuestionTable questions={this.state.questions} 
//                     filters={this.state.filters}
//                     forms={this.state.forms} />*/}

//         <TableExample questions={this.state.questions} 
//         filters={this.state.filters}
//         forms={this.state.forms}/>
//         </div>
//         );
//     }
//   }

//   export default App;


/*

<CustomBarChart />

        <CustomPieChart data={dataPie2} />
        <CustomPieChart data={dataPie1} />

        <CustomPieChartPercentage data={dataPie2} />
        <CustomPieChartPercentage data={dataPie1} />

        */

/*
filterQuestions = (forms, question) => {


    let formsFiltered = this.state.filters.length > 0 ? this.filterForms(forms, question) : forms;

    return formsFiltered
        .map(form => form.questions)
        .reduce((a,b) => a.concat(b), [])
        .filter(q => q.questionId == question.id);

  }
  filterForms = (forms, questionChart) => {
    let filters = this.state.filters;
    let filteredForms = forms.filter(f => {
      let addForm = true;
      f.questions.forEach(function(question){
        if(question.questionId !== questionChart.id) 
        {
          filters.forEach(function(filter){
                  if(question.questionId == filter.questionId){
                    switch(question.questionType) {
                      case "MO":
                        addForm = question.selectedOption === filter.value;
                        break;
                      case "YN":
                        addForm = question.yesNoValue === filter.value;
                        break;
                    }            
                  }
                });
          }
      });
      return addForm;    
    });

    return filteredForms;
  }
*/