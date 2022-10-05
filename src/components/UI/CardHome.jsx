import React,{ useState, useEffect } from 'react'
import { Container,Card,Nav } from 'react-bootstrap'
import axios from 'axios'
import PopupPet from './PopupPet'
import { Button } from 'flowbite-react'

export function CardHome() {

  const [button, setButton] = useState(true)
  const [btn, setBtn] = useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [cuerpoPost, setCuerpoPost] = useState("")
  const [tituloPost, setTituloPost] = useState("")
  const [fechaPost, setFechaPost] = useState("")
  // const [cuerpoPost, setCuerpoPost] = useState("")
  const [noticia, setNoticia] = useState([])
  const [tips, setTips] = useState([])
  const [experiencias, setExperiencias] = useState([])

  useEffect(()=>{
    containerNavNoticias()
    Noticias()
    Tips()
    Experiencias()
  },[1])

  const containerNavNoticias =()=>{
    const noticias = document.getElementById('Noticias')
    const tips = document.getElementById('Tips')
    const experiencias = document.getElementById('Exp')
    noticias.classList.add('d-flex')
    tips.classList.add('divdisable')
    tips.classList.remove('d-flex')
    experiencias.classList.add('divdisable')
    experiencias.classList.remove('d-flex')
  }
  const containerNavTips =()=>{
    const noticias = document.getElementById('Noticias')
    const tips = document.getElementById('Tips')
    const experiencias = document.getElementById('Exp')
    const not = document.getElementById('noticias')
    not.classList.remove('active')
    tips.classList.add('d-flex')
    noticias.classList.add('divdisable')
    noticias.classList.remove('d-flex')
    experiencias.classList.add('divdisable')
    experiencias.classList.remove('d-flex')
  }
  const containerNavExp =()=>{
    const noticias = document.getElementById('Noticias')
    const tips = document.getElementById('Tips')
    const experiencias = document.getElementById('Exp')
    const not = document.getElementById('noticias')
    not.classList.remove('active')
    experiencias.classList.add('d-flex')
    tips.classList.add('divdisable')
    tips.classList.remove('d-flex')
    noticias.classList.add('divdisable')
    noticias.classList.remove('d-flex')
  }

  const Noticias = ()=>{
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/posts/tipopost/N',
    })
    .then(function (response) {
      setNoticia(response.data)
  
    })
  }

  const Tips = () => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/posts/tipopost/E',
    })
    .then(function (response) {
      setTips(response.data)
  
    })
  }

  const Experiencias = () => {
    axios({
      method: 'get',
      url: 'https://api.cruzpet.com:8443/v1.0/posts/tipopost/C',
    })
    .then(function (response) {
      setExperiencias(response.data)
  
    })
  }
  
  const handleClick = (e) => {
    axios.post("https://api.cruzpet.com:8443/v1.0/posts/traerpost",{
    	idPost: e.target.value
    }).then(function(resp){
      setFechaPost(resp.data.fechaPost)
      setTituloPost(resp.data.tituloPost)
      setCuerpoPost(resp.data.cuerpoPost)
    })
  }

  return (
    <div className='hidden md:flex'>
      <Container className='' data-aos='fade-up'>
        <Card>
          <Card.Header>
            <Nav className='d-flex justify-content-start' variant="tabs" defaultActiveKey="#noticias">
              <Nav.Item>
                <Nav.Link href="#noticias" id='noticias' className='noticias' onClick={containerNavNoticias}>Noticias</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#tips" id='tips' className='tips'  onClick={containerNavTips}>Tips</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#experiencias" id='experiencias' className='experiencias' onClick={containerNavExp}>Experiencias</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body id='Noticias' className='d-flex' maxLength ="4">
            {noticia.map(noti =>
              <Card key={noti.idPost} className='m-1' style={{ width: '18rem' }}>
                  <Card.Body >
                    <Card.Title className='module line-clam'>{noti.tituloPost}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{noti.fechaPost.split('T')[0]}</Card.Subtitle>
                    <p className='module line-clamp'>{noti.cuerpoPost}</p>
                    {/* <Button>Ver</Button> */}
                    <button value={noti.idPost} className='my-1 hover:text-blue-800' onMouseDown={handleClick} onClick={() => setShowModal(true)} type="button" outline={btn} gradientDuoTone="greenToBlue">
                      Seguir leyendo...
                    </button>
                  </Card.Body>
              </Card>
            )}
          </Card.Body>
          <Card.Body id='Tips' className='d-flex'>
            {tips.map(tip =>
              <Card key={tip.idPost} className='m-1' style={{ width: '18rem' }}>
                  <Card.Body >
                    <Card.Title className='module line-clam'>{tip.tituloPost}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{tip.fechaPost.split('T')[0]}</Card.Subtitle>
                    <p className='module line-clamp'>{tip.cuerpoPost}</p>
                    <button value={tip.idPost} className='my-1' onMouseDown={handleClick} onClick={() => setShowModal(true)} type="button" outline={btn} gradientDuoTone="greenToBlue">
                      Seguir leyendo...
                    </button>
                  </Card.Body>
              </Card>
            )}
          </Card.Body>
          <Card.Body id='Exp' className='d-flex'>
            {experiencias.map(exp =>
              <Card key={exp.idPost} className='m-1' style={{ width: '18rem' }}>
                  <Card.Body >
                    <Card.Title className='module line-clam'>{exp.tituloPost}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{exp.fechaPost.split('T')[0]}</Card.Subtitle>
                    <p className='module line-clamp'>{exp.cuerpoPost}</p>
                    <button value={exp.idPost} className='my-1' onMouseDown={handleClick} onClick={() => setShowModal(true)} type="button" outline={btn} gradientDuoTone="greenToBlue">
                      Seguir leyendo...
                    </button>
                  </Card.Body>
              </Card>
            )}
          </Card.Body>
        </Card>
      </Container>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-screen-lg">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center text-center justify-center px-4 py-3 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">
                      {tituloPost}
                    </h3>
                  </div>
                    {/*body*/}
                    <div className='m-4'>
                      {cuerpoPost}
                    </div>
                    {/*footer*/}
                      <div className="flex items-center justify-start p-3 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-black background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </div>
  )
}
