// ─── Práctica 3 · Emisor ────────────────────────────────────────────────────
// Actividades:
// Sesión 1
//   Act 1  · Player DASH con dashjs
//   Act 2  · Pipeline vídeo → canvas (bucle RAF)
//   Act 3  · Overlay texto-título (showTitle, titleText)
//   Act 4  · Overlay logo (logoImg, file input)
// Sesión 2
//   Act 5  · PiP cámara (cameraOn, cameraStreamRef)
//   Act 6  · Capturar canvas como MediaStream (canvas.captureStream)
//   Act 7  · Crear Peer + mostrar ID propio
//   Act 8  · Llamar al receptor con canvas stream
// ────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

// TODO Actividad 1: importar dashjs
// import * as dashjs from 'dashjs'

// TODO Actividad 7: importar Peer de peerjs
// import Peer from 'peerjs'

// URL del manifiesto DASH (cámbiala por una local si tienes una)
const DASH_URL =
  'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'

// Dimensiones del canvas de composición
const CANVAS_W = 854
const CANVAS_H = 480

export default function App() {
  // ── Refs ─────────────────────────────────────────────────────────────────
  const videoRef    = useRef(null)   // <video> para el player DASH
  const canvasRef   = useRef(null)   // canvas de composición
  const rafRef      = useRef(null)   // ID del requestAnimationFrame
  const playerRef   = useRef(null)   // instancia dashjs.MediaPlayer

  // TODO Actividad 5: ref para el <video> de cámara
  // const cameraVideoRef = useRef(null)

  // TODO Actividad 5: ref para guardar el MediaStream de la cámara
  // const cameraStreamRef = useRef(null)

  // TODO Actividad 7: ref para la instancia Peer
  // const peerRef = useRef(null)

  // ── Estado: overlays Sesión 1 ─────────────────────────────────────────────
  const [showTitle, setShowTitle] = useState(true)
  const [titleText, setTitleText] = useState('EDAMM P3 - WebRTC Live Streaming')

  // TODO Actividad 4: estado para la imagen del logo (HTMLImageElement | null)
  // const [logoImg, setLogoImg] = useState(null)

  // ── Estado: cámara (Sesión 2) ─────────────────────────────────────────────
  // TODO Actividad 5: estado para activar/desactivar cámara
  // const [cameraOn, setCameraOn] = useState(false)

  // ── Estado: PeerJS (Sesión 2) ─────────────────────────────────────────────
  // TODO Actividad 7: estado para el ID propio del Peer
  // const [myPeerId, setMyPeerId] = useState('')

  // TODO Actividad 8: estado para el ID del receptor al que llamar
  // const [remotePeerId, setRemotePeerId] = useState('')

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 1 · Inicializar DASH player
  // ═════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // TODO Actividad 1: crear e inicializar el player DASH
    // const player = dashjs.MediaPlayer().create()
    // player.initialize(video, DASH_URL, false)
    // playerRef.current = player

    // return () => { playerRef.current?.reset() }
  }, [])

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 2 · Bucle RAF: pintar vídeo en canvas
  // ═════════════════════════════════════════════════════════════════════════
  const drawFrame = useCallback(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    // TODO Actividad 2: obtener contexto con willReadFrequently
    // const ctx = canvas.getContext('2d', { willReadFrequently: true })

    // TODO Actividad 2: dibujar el frame de vídeo
    // ctx.drawImage(video, 0, 0, CANVAS_W, CANVAS_H)

    // TODO Actividad 3: dibujar overlay de título (si showTitle)
    //   - Dibuja un rectángulo oscuro en la parte inferior
    //   - Escribe titleText en blanco encima

    // TODO Actividad 4: dibujar logo (si logoImg)
    //   - const logoW = 72
    //   - const logoH = logoW * (logoImg.height / logoImg.width)
    //   - ctx.drawImage(logoImg, CANVAS_W - logoW - 10, 10, logoW, logoH)

    // TODO Actividad 6: dibujar cámara PiP (si cameraOn)
    //   - ctx.drawImage(cameraVideoRef.current, 0, 0, 213, 120)

    rafRef.current = requestAnimationFrame(drawFrame)
  // logoImg en las dependencias hace que el bucle use siempre el valor actual
  // TODO Actividad 4: añadir logoImg a esta lista
  // TODO Actividad 5: añadir cameraOn
  }, [showTitle, titleText])

  // Arrancar/parar RAF cuando el vídeo reproduzca o pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay  = () => { rafRef.current = requestAnimationFrame(drawFrame) }
    const onPause = () => { cancelAnimationFrame(rafRef.current) }
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    // Si el vídeo ya está reproduciendo cuando drawFrame cambia
    // (p.ej. al cargar un logo), reiniciar el bucle inmediatamente
    if (!video.paused && !video.ended) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(drawFrame)
    }
    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [drawFrame])

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 4 · Cargar logo desde archivo local
  // ═════════════════════════════════════════════════════════════════════════
  function handleLogoFile(e) {
    const file = e.target.files[0]
    if (!file) return
    // TODO Actividad 4:
    // 1. const img = new Image()
    // 2. img.onload = () => setLogoImg(img)
    // 3. img.src = URL.createObjectURL(file)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 5 · Capturar cámara y conectar al <video> PiP
  // ═════════════════════════════════════════════════════════════════════════
  async function toggleCamera() {
    // TODO Actividad 5:
    // Si cameraOn:
    //   - parar tracks de cameraStreamRef.current
    //   - setCameraOn(false)
    // Si !cameraOn:
    //   - const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    //   - cameraStreamRef.current = stream
    //   - cameraVideoRef.current.srcObject = stream
    //   - await cameraVideoRef.current.play()
    //   - setCameraOn(true)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 7 · Inicializar PeerJS
  // ═════════════════════════════════════════════════════════════════════════
  function initPeer() {
    // TODO Actividad 7:
    // 1. const peer = new Peer()
    // 2. peer.on('open', id => { peerRef.current = peer; setMyPeerId(id) })
  }

  // ═════════════════════════════════════════════════════════════════════════
  // Actividad 8 · Llamar al receptor con el stream del canvas
  // ═════════════════════════════════════════════════════════════════════════
  function callReceiver() {
    // TODO Actividad 8:
    // 1. const canvasStream = canvasRef.current.captureStream(30)
    // 2. const call = peerRef.current.call(remotePeerId, canvasStream)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // Render
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div className="app">
      <header className="app-header">
        <h1>EDAMM P3 · Emisor</h1>
        <Link to="/receiver" className="receiver-link">
          → Abrir receptor
        </Link>
      </header>

      {/* ── Barra de controles ─────────────────────────────────────────── */}
      <div className="controls-bar">

        {/* Actividad 3: checkbox + campo de texto para el título */}
        <label className="ctrl-check">
          {/*<input type="checkbox"
            checked={showTitle}
            onChange={e => setShowTitle(e.target.checked)}/>*/}
          Mostrar título
        </label>
        {/*<input className="ctrl-text" type="text"
          value={titleText}
          onChange={e => setTitleText(e.target.value)}
          disabled={!showTitle}
          placeholder="Texto del título…"/>*/}

        <span className="divider">|</span>

        {/* Actividad 4: file input para el logo */}
         {/*<label className="ctrl-file"> Logo:
          <input type="file" accept="image/*" onChange={handleLogoFile} />
        </label>*/}

        <span className="divider">|</span>

        {/* TODO Actividad 5: botón para activar/desactivar cámara */}
        {/* <button className="btn-action" onClick={toggleCamera}>
          {cameraOn ? 'Apagar cámara' : 'Activar cámara PiP'}
        </button> */}

        {/* TODO Actividad 7: mostrar ID propio y botón Conectar Peer */}
        {/* <button className="btn-action" onClick={initPeer}>Conectar Peer</button>
        {myPeerId && (
          <span className="peer-id">Mi ID: <strong>{myPeerId}</strong></span>
        )} */}

        {/* TODO Actividad 8: input ID receptor + botón Llamar */}
        {/* <input
          className="ctrl-text"
          type="text"
          value={remotePeerId}
          onChange={e => setRemotePeerId(e.target.value)}
          placeholder="ID del receptor…"
        />
        <button
          className="btn-action"
          disabled={!myPeerId || !remotePeerId}
          onClick={callReceiver}
        >
          Llamar
        </button> */}
      </div>

      {/* ── Paneles ────────────────────────────────────────────────────── */}
      <div className="panels">

        {/* Panel izquierdo: player DASH con controles */}
        <div className="panel">
          <h2>Player DASH</h2>
          <video
            ref={videoRef}
            className="media-box"
            controls
            crossOrigin="anonymous"
          />
        </div>

        {/* Panel derecho: canvas de composición */}
        <div className="panel">
          <h2>Canvas compuesto</h2>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="media-box"
          />
        </div>
      </div>

      {/* <video> oculto para la cámara PiP */}
      {/* TODO Actividad 5: descomentar y añadir ref + muted */}
      {/* <video ref={cameraVideoRef} muted style={{ display: 'none' }} /> */}
    </div>
  )
}
