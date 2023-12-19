import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const TransectionTable = () => {
  
  const [tableData, upadteTableData] = useState(null);
  const [isTableData, updateIstableData] = useState(false);
  const [page, updatePage] = useState(1);
  const [query, updateQuery] = useState('');
  const [month, updateMonth] = useState('march');

  useEffect(() => {
    const getTableData = async () => {
      fetch(`http://localhost:8000/api/products/transections?q=${query}&month=${month}&page=${page}`).then((response) => { return response.json()}).then((data) => {
        upadteTableData(data);
        updateIstableData(true);
      })
    }
    getTableData();
  }, [page, query, month]);



  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={6} mt-50>
          <h2 className="text-center" style={{margin:'50px auto 50px auto'}}>Transection Dashboard</h2>
        </Col>
      </Row>
      
      <Row className="mb-3">
        
        <Col xs={6} md={6} className="text-center">
            <Form.Control type="text" placeholder="Search transections" className="mb-3" onChange={(e) => updateQuery(e.target.value)} />
        </Col>
        <Col>
        
        </Col>
        <Col xs={6} md={3}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Select value={ month } onChange={async (e) => updateMonth(e.target.value)}>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="octomber">Octomber</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </Form.Select>
        </Form.Group>
        </Col>
        
      </Row>

      

      <Table striped bordered hover className='primary'>
        <thead>
          <tr className='primary'>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{
          isTableData ?
          tableData.map((row) => {
            return (
              

              (
              <tr>
                <td>{ row._id }</td>
                <td>{ row.title }</td>
                <td>{ row.description }</td>
                <td>{ row.price }</td>
                <td>{ row.category }</td>
                <td>{ row.sold ? 'Yes' : 'No'  }</td>
                <td><img style={{width:'70px'}} src={ row.image } /></td>
              </tr>
              )
            )
          }) : ""
          
          }
        </tbody>
      </Table>
      <Row>
        <Col>
          <p>Page No: { page }</p>
        </Col>
        <Col style={{cursor : 'pointer'}} xs={2} md={5} className="d-inline-flex mx-auto">
            <p style={{marginRight:'10px'}} onClick={() => updatePage(page == 1 ? 1 : page - 1) }>Previous</p> 
            <p style={{marginRight:'10px'}}> - </p>
            <p onClick={() => JSON.stringify(tableData) != '[]' ? updatePage(page + 1) : null }>Next</p>
        </Col>
            
        <Col xs={6} md={2} className='float-lg-right'>
          <p>Per Page: 10</p>
        </Col>
      </Row>
    </div>
  );
};

export default TransectionTable;
