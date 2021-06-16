
import './Table.css';

import  { useState,useEffect } from 'react';






function Table() {

  const [data, setData] = useState('');
  

  useEffect(()=>{
    
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET", "http://localhost:8080/api/getData");
    xhttp.send();
    xhttp.onload = function() {  
      if(this.status==200){
        let response=JSON.parse(this.responseText);
        setData(response);        
      }
    };


  },[]);


  function getRelatives(d){
    if(Object.keys(d.kids).length>0){
      let relatives =d.kids.has_relatives.records;
      

      let relativesData=[];
      let r;
      let c=0;
      for(r of relatives){
        let id=c;
        let relativeID=r.data['Relative ID'];
        relativesData.push(
                          <div className='row  full'>                                   
                                <div className='col-auto  vertical-centre'>                                
                                  {Object.keys(r.kids).length==0 && <small><button className='fas fa-chevron-right invisible' disabled></button> </small>}
                                  {Object.keys(r.kids).length>0 && <small><button className='fas fa-chevron-right' onClick={(e)=>{toggleRow(e,relativeID)}}></button> </small>}
                                </div>
                                
                                <div className='col'><small>{r.data['Relative ID']}</small></div>
                                <div className='col'><small>{r.data['Patient ID']}</small></div>
                                <div className='col'><small>{r.data['Is alive?']}</small></div>
                                <div className='col'><small>{r.data['Frequency of visits']}</small></div>

                                 <div className='col-12 hidden' id={relativeID}>
                                     <div className='container'>                                            
                                        <div>
                                          <div className='row top1'><small>HAS PHONE</small></div>  
                                                <div className='row record full'>                                 
                                                    <div className='col-auto  vertical-centre'>
                                                          <button className='invisible'><small> <i class="fa fa-chevron-right"></i></small></button>                                    
                                                    </div> 
                                                    <div className='col'><small>PHONE ID</small></div>
                                                    <div className='col'><small>ID of the relative</small></div>
                                                    <div className='col'><small>Phone</small></div>                                                    
                                                </div> 

                                               {getPhones(d,id)}
                                          </div>
                                       </div>
                                 </div>


                          </div> 

        )
        c++;
      }

      return relativesData;


    }

  }


  function getPhones(d,id){
  if(Object.keys(d.kids.has_relatives.records[id].kids).length>0){
    let phones =d.kids.has_relatives.records[id].kids.has_phone.records;
    let phonesData=[];
    let r;
    
    for(r of phones){
      
      phonesData.push(
                        <div className='row  full'>                                                                   
                              <div className='col'><small>{r.data['Phone ID']}</small></div>
                              <div className='col'><small>{r.data['ID of the relative']}</small></div>
                              <div className='col'><small>{r.data['Phone']}</small></div>                                                                
                        </div> 

      )
      
    }

    return phonesData;


  }
  

  }

  function displayData(){
    if(data!=''){
      
      let allData=[];
      let d;
      
      let c=0;
      
      for (d of data){        
        
        let id=c;
        allData.push (
              <div className='row top1 full'> 
                <div className='col-auto  vertical-centre'>
                    {Object.keys(d.kids).length>0 && <small><button className='fas fa-chevron-right' onClick={(e)=>{toggleRow(e,id)}}></button> </small>}
                                        
                    {Object.keys(d.kids).length==0 && <button className='invisible' disabled><small> <i class="fa fa-chevron-right"></i></small></button> } 
                </div>
                <div className='col vertical-centre'><small>{d.data['Identification number']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Name']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Gender']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Risk']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Hair length']}</small></div>
                <div className='col-auto vertical-centre'><small>{d.data['IQ']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Admission date']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Last breakdown']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Yearly fee']}</small></div>
                <div className='col vertical-centre'><small>{d.data['Knows the Joker?']}</small></div>
                <div className='col-auto vertical-centre'></div>

                <div className='col-12  hidden' id={c}>
                  <div className='container'>                                            
                          <div>
                            <div className='row top1'><small>HAS RELATIVES</small></div>  
                            <div className='row record full'>                                 
                              <div className='col-auto  vertical-centre'>
                                    <button className='invisible'><small> <i class="fa fa-chevron-right"></i></small></button>                                    
                              </div> 
                              <div className='col'><small>Relative ID</small></div>
                              <div className='col'><small>Patient ID</small></div>
                              <div className='col'><small>Is alive?</small></div>
                              <div className='col'><small>Frequency of visits</small></div>
                            </div>
  
                            
                            {getRelatives(d)}

                          </div>

                  </div>
                </div>

              </div>
        )

        c++;
      }

      return allData
    }
  }



  function toggleRow(e,id){
    
    let button = e.target;
    let expand=document.getElementById(id);
    
    if(button.classList.contains('fa-chevron-right')){
      button.classList.remove('fa-chevron-right');
      button.classList.add('fa-chevron-down');      
      expand.classList.remove('hidden');
    }  
    else{
      button.classList.remove('fa-chevron-down');
      button.classList.add('fa-chevron-right');
      expand.classList.add('hidden');
    }
  
  }

    return (
      <div className='container'>
          <div className='row'>Data-1 JSON </div>
          <div className='row top1 full record'>
              <div className='col-auto'><button className='invisible'><small> <i class="fa fa-chevron-right"></i></small></button></div>
              <div className='col'><small>Identification number</small></div>
              <div className='col'><small>Name</small></div>
              <div className='col'><small>Gender</small></div>
              <div className='col'><small>Risk</small></div>
              <div className='col'><small>Hair length</small></div>
              <div className='col-auto'><small>IQ</small></div>
              <div className='col'><small>Admission date</small></div>
              <div className='col'><small>Last breakdown</small></div>
              <div className='col'><small>Yearly fee</small></div>
              <div className='col'><small>Knows the joker?</small></div>
              <div className='col-auto'></div>
          </div>
          {displayData()}
          
          
      </div>
    );
  }
  
  export default Table;