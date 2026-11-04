import { useEffect, useRef, useState } from 'react'
import { Section } from './Section'
import { asset } from '../lib/asset'
import {
  FiUploadCloud,
  FiDownload,
  FiRotateCcw,
  FiUser,
  FiTag,
  FiZoomIn,
  FiMove,
  FiCheck,
  FiImage,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'

const categoryOptions = [
  "Men's 7.5 KM Runner",
  "Women's 5 KM Runner",
]

export function PhotoCard() {
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // State
  const [name, setName] = useState('')
  const [category, setCategory] = useState(categoryOptions[0])
  const [userImage, setUserImage] = useState(null)
  const [defaultImage, setDefaultImage] = useState(null)
  const [logoImage, setLogoImage] = useState(null)
  const [zoom, setZoom] = useState(1.15)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  // Load default placeholder image (run.jpg) and logo
  useEffect(() => {
    const dImg = new Image()
    dImg.crossOrigin = 'anonymous'
    dImg.src = asset('images/run.jpg')
    dImg.onload = () => setDefaultImage(dImg)

    const lImg = new Image()
    lImg.crossOrigin = 'anonymous'
    lImg.src = asset('images/logo.jpg')
    lImg.onload = () => setLogoImage(lImg)
  }, [])

  // Handle uploaded image
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setUserImage(img)
        setZoom(1.1)
        setPosX(0)
        setPosY(0)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Draw the photo card frame onto the canvas (Official Midnight Navy, Electric Lime & Cyan)
  const renderCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 1200
    const H = 1200

    // Ensure 1200x1200 resolution
    canvas.width = W
    canvas.height = H

    // 1. Draw Background User Photo (or default runner photo)
    const imgToDraw = userImage || defaultImage
    if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
      ctx.save()
      const imgRatio = imgToDraw.naturalWidth / imgToDraw.naturalHeight
      const canvasRatio = W / H
      let drawW, drawH

      if (imgRatio > canvasRatio) {
        drawH = H * zoom
        drawW = drawH * imgRatio
      } else {
        drawW = W * zoom
        drawH = drawW / imgRatio
      }

      const drawX = (W - drawW) / 2 + (posX / 100) * (W * 0.45)
      const drawY = (H - drawH) / 2 + (posY / 100) * (H * 0.45) - 35

      ctx.drawImage(imgToDraw, drawX, drawY, drawW, drawH)
      ctx.restore()
    } else {
      // Fallback athletic dark navy gradient
      const bgGrad = ctx.createLinearGradient(0, 0, W, H)
      bgGrad.addColorStop(0, '#0c0a24')
      bgGrad.addColorStop(1, '#1b174a')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)
    }

    // 2. Slanted Bottom Banner (Reduced height so photo gets more room!)
    const slopeYLeft = 920
    const slopeYRight = 835

    // 2a. Deep Drop Shadow behind the slanted edge
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'
    ctx.shadowBlur = 40
    ctx.shadowOffsetY = -12
    ctx.beginPath()
    ctx.moveTo(0, slopeYLeft)
    ctx.lineTo(W, slopeYRight)
    ctx.lineTo(W, H)
    ctx.lineTo(0, H)
    ctx.closePath()
    ctx.fillStyle = 'rgba(7, 6, 24, 0.98)'
    ctx.fill()
    ctx.restore()

    // 2b. Clip and Fill Banner Body with Logo Midnight Navy Gradient
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0, slopeYLeft)
    ctx.lineTo(W, slopeYRight)
    ctx.lineTo(W, H)
    ctx.lineTo(0, H)
    ctx.closePath()
    ctx.clip()

    // Deep rich navy gradient: deepest obsidian navy -> signature logo navy (#211D50)
    const bannerGrad = ctx.createLinearGradient(0, slopeYRight, W, H)
    bannerGrad.addColorStop(0, '#070617')
    bannerGrad.addColorStop(0.35, '#0f0c2d')
    bannerGrad.addColorStop(0.75, '#171342')
    bannerGrad.addColorStop(1, '#211d50')
    ctx.fillStyle = bannerGrad
    ctx.fillRect(0, slopeYRight - 20, W, H - slopeYRight + 20)

    // Luminous Cyan & Lime Ambient Radial Energy Glow behind text
    const radGlow = ctx.createRadialGradient(W - 220, slopeYRight + 170, 40, W - 220, slopeYRight + 170, 460)
    radGlow.addColorStop(0, 'rgba(48, 139, 184, 0.45)') // logo cyan aura
    radGlow.addColorStop(0.5, 'rgba(184, 210, 49, 0.22)') // logo lime halo
    radGlow.addColorStop(1, 'transparent')
    ctx.fillStyle = radGlow
    ctx.fillRect(0, slopeYRight, W, H)

    // Flowing Luminous Dotted Particle Wave (Cyan, Ice Blue, and Lime)
    const tracks = 10
    for (let t = 0; t < tracks; t++) {
      const trackOffset = (t - 4) * 8
      const tNorm = 1 - Math.abs(t - 4) / 5
      for (let x = 0; x < W; x += 15) {
        const p = x / W
        const waveY = 1155 - Math.sin(p * Math.PI * 1.35) * 45 + Math.sin(p * 6.5) * 6 + trackOffset
        if (waveY < H && waveY > slopeYRight) {
          const dotSize = (1.3 + Math.sin(x * 0.08 + t * 0.9) * 0.8) * (t % 2 === 0 ? 1.2 : 0.8)
          const alpha = (0.15 + tNorm * 0.4) * (0.6 + Math.sin(x * 0.04 + t) * 0.4)

          ctx.beginPath()
          ctx.arc(x, waveY, dotSize, 0, Math.PI * 2)
          if (p < 0.35) {
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha})` // electric cyan
          } else if (p < 0.72) {
            ctx.fillStyle = `rgba(224, 242, 254, ${alpha})` // ice blue
          } else {
            ctx.fillStyle = `rgba(184, 210, 49, ${alpha})` // logo lime chartreuse
          }
          ctx.fill()
        }
      }
    }
    ctx.restore()

    // 2c. Glowing Slanted Top Border Line (Cyan to Lime Electric Laser Line)
    ctx.save()
    const lineGrad = ctx.createLinearGradient(0, slopeYLeft, W, slopeYRight)
    lineGrad.addColorStop(0, '#38bdf8') // bright electric cyan
    lineGrad.addColorStop(0.35, '#308bb8') // logo ocean cyan
    lineGrad.addColorStop(0.7, '#b8d231') // logo electric lime flare
    lineGrad.addColorStop(1, '#38bdf8')

    ctx.beginPath()
    ctx.moveTo(0, slopeYLeft)
    ctx.lineTo(W, slopeYRight)
    ctx.strokeStyle = lineGrad
    ctx.lineWidth = 7
    ctx.shadowColor = 'rgba(56, 189, 248, 0.95)'
    ctx.shadowBlur = 22
    ctx.stroke()
    ctx.restore()

    // ─────────────────────────────────────────────────────────────
    // 3. COMBINED CONTENT LAYER (COMFORTABLE TOP PADDING & ALIGNMENT)
    // ─────────────────────────────────────────────────────────────
    ctx.save()

    // Unified dynamic angle matching the slanted banner top line
    const bannerAngle = Math.atan2(slopeYRight - slopeYLeft, W) // ≈ -0.07065 rad (-4.05°)
    const bannerLength = Math.hypot(W, slopeYRight - slopeYLeft) // ≈ 1203px

    // Translate to the start of the slanted line and rotate along the banner angle
    ctx.translate(0, slopeYLeft)
    ctx.rotate(bannerAngle)

    // Sleek, compact Badge Card
    const badgeCardW = 136
    const badgeCardH = 136
    const badgeRadius = 24

    // Measure left typography width
    ctx.font = 'italic 900 44px "Barlow Condensed", sans-serif'
    const agesW = ctx.measureText('AGES ').width
    const marathonW = ctx.measureText('MARATHON').width
    const leftTextW = agesW + marathonW
    const leftBlockW = badgeCardW + 18 + leftTextW

    // Measure right typography width
    const rawName = name.trim() || 'YOUR NAME HERE'
    const displayName = rawName.toUpperCase()

    let nameFontSize = 74
    ctx.font = `italic 900 ${nameFontSize}px "Barlow Condensed", sans-serif`
    const maxRightTextAllowed = 610
    while (ctx.measureText(displayName).width > maxRightTextAllowed && nameFontSize > 30) {
      nameFontSize -= 2
      ctx.font = `italic 900 ${nameFontSize}px "Barlow Condensed", sans-serif`
    }
    const measuredNameW = ctx.measureText(displayName).width

    ctx.font = '800 17px "Inter", sans-serif'
    const catW = ctx.measureText(`${category.toUpperCase()} · ONE SCHOOL, ONE RUN`).width

    ctx.font = '800 16px "Inter", sans-serif'
    const dateW = 24 + ctx.measureText('16 DECEMBER 2026').width

    ctx.font = '800 14px "Inter", sans-serif'
    const venueStr = 'GARIB-E-NAWAZ HIGH SCHOOL, HALISHAHAR, CHATTOGRAM'
    const venueW = 24 + ctx.measureText(venueStr).width

    const rightBlockW = Math.max(measuredNameW, catW, dateW, venueW, 280)
    const midGap = 70 // comfortable gap between left and right parts

    const totalContentW = leftBlockW + midGap + rightBlockW

    // HORIZONTAL CENTERING
    const hPadding = Math.max(45, (bannerLength - totalContentW) / 2)

    const badgeCardX = hPadding
    const textBesideX = badgeCardX + badgeCardW + 18
    const rightColX = badgeCardX + leftBlockW + midGap

    // VERTICAL POSITIONING: Downshifted slightly to increase top side padding
    const vPadding = 66
    const badgeCardY = vPadding

    // 3a. LEFT SIDE: Logo Badge Card
    ctx.shadowColor = 'rgba(48, 139, 184, 0.75)'
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.roundRect(badgeCardX, badgeCardY, badgeCardW, badgeCardH, badgeRadius)

    // Midnight Navy gradient badge fill
    const badgeGrad = ctx.createLinearGradient(badgeCardX, badgeCardY, badgeCardX + badgeCardW, badgeCardY + badgeCardH)
    badgeGrad.addColorStop(0, '#1c1744')
    badgeGrad.addColorStop(0.5, '#211d50')
    badgeGrad.addColorStop(1, '#0e0b24')
    ctx.fillStyle = badgeGrad
    ctx.fill()

    // Glowing electric lime border
    ctx.strokeStyle = '#b8d231'
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.shadowColor = 'transparent'

    // Draw the circular AGES Logo inside the angled badge
    if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
      ctx.save()
      const logoInnerPad = 8
      const innerW = badgeCardW - logoInnerPad * 2
      const innerCenterX = badgeCardX + badgeCardW / 2
      const innerCenterY = badgeCardY + badgeCardH / 2
      const innerRadius = innerW / 2

      ctx.beginPath()
      ctx.arc(innerCenterX, innerCenterY, innerRadius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(
        logoImage,
        innerCenterX - innerRadius,
        innerCenterY - innerRadius,
        innerRadius * 2,
        innerRadius * 2,
      )
      ctx.restore()
    }

    // 3b. Left Typography beside the logo
    // Line 1: "AGES MARATHON"
    ctx.font = 'italic 900 44px "Barlow Condensed", sans-serif'
    ctx.fillStyle = '#38bdf8' // logo electric cyan
    ctx.fillText('AGES', textBesideX, badgeCardY + 44)
    ctx.fillStyle = '#ffffff'
    ctx.fillText('MARATHON', textBesideX + agesW, badgeCardY + 44)

    // Line 2: "2026 · CHATTOGRAM"
    ctx.font = 'italic 800 25px "Barlow Condensed", sans-serif'
    ctx.fillStyle = '#b8d231' // logo electric lime
    ctx.fillText('2026', textBesideX, badgeCardY + 78)
    const yearW = ctx.measureText('2026 ').width
    ctx.font = '800 15px "Inter", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('· CHATTOGRAM', textBesideX + yearW, badgeCardY + 75)

    // Line 3: Sub-brand "⚡ TEAM SAF"
    ctx.font = '800 14px "Inter", sans-serif'
    ctx.fillStyle = '#c5dc2b' // electric lime chartreuse
    ctx.fillText('⚡ TEAM SAF', textBesideX, badgeCardY + 110)

    // ─────────────────────────────────────────────────────────────
    // 3c. RIGHT SIDE: Participant Name, Slogan, Date & Venue
    // ─────────────────────────────────────────────────────────────
    // Line 1: Catchphrase (Directly aligned with top of the logo badge!)
    ctx.font = 'italic 900 38px "Barlow Condensed", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 2
    ctx.fillText('READY FOR THE RUN', rightColX, badgeCardY + 16)

    // Line 2: The HERO Text — Participant Name in Logo Signature Electric Lime (#C5DC2B)
    ctx.font = `italic 900 ${nameFontSize}px "Barlow Condensed", sans-serif`
    ctx.fillStyle = '#c5dc2b' // logo vibrant lime chartreuse
    ctx.shadowColor = 'rgba(184, 210, 49, 0.65)'
    ctx.shadowBlur = 18
    ctx.shadowOffsetY = 2
    ctx.fillText(displayName, rightColX, badgeCardY + 74)
    ctx.shadowColor = 'transparent'

    // Line 3: Category & Slogan (Clean ice white)
    ctx.font = '800 17px "Inter", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`${category.toUpperCase()} · ONE SCHOOL, ONE RUN`, rightColX, badgeCardY + 112)

    // Line 4: Date Line (Dedicated line with Theme Green / Lime focus)
    const dateX = rightColX
    const dateY = badgeCardY + 144

    // Glowing Theme Green Calendar Icon
    ctx.save()
    ctx.strokeStyle = '#b8d231' // theme lime / green
    ctx.fillStyle = '#b8d231'
    ctx.lineWidth = 1.8
    ctx.shadowColor = 'rgba(184, 210, 49, 0.6)'
    ctx.shadowBlur = 8

    // Mini calendar shape
    ctx.beginPath()
    ctx.roundRect(dateX, dateY - 12, 14, 13, 2.5)
    ctx.stroke()
    // Binder rings
    ctx.fillRect(dateX + 3, dateY - 15, 2, 4)
    ctx.fillRect(dateX + 9, dateY - 15, 2, 4)
    // Horizontal header divider
    ctx.beginPath()
    ctx.moveTo(dateX, dateY - 8)
    ctx.lineTo(dateX + 14, dateY - 8)
    ctx.stroke()

    // Date text in theme green (#B8D231)
    ctx.font = '800 16px "Inter", sans-serif'
    ctx.fillText('16 DECEMBER 2026', dateX + 22, dateY)
    ctx.restore()

    // Line 5: Venue Line (Dedicated line with glowing cyan Location Icon)
    const pinX = rightColX
    const pinY = badgeCardY + 172

    // Draw glowing cyan pin icon
    ctx.save()
    ctx.fillStyle = '#38bdf8'
    ctx.shadowColor = '#38bdf8'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.arc(pinX + 7, pinY - 4, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(pinX + 2, pinY - 2)
    ctx.lineTo(pinX + 7, pinY + 6)
    ctx.lineTo(pinX + 12, pinY - 2)
    ctx.closePath()
    ctx.fill()
    // Pin center white dot
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(pinX + 7, pinY - 4, 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Venue text
    ctx.font = '800 14px "Inter", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('GARIB-E-NAWAZ HIGH SCHOOL, HALISHAHAR, CHATTOGRAM', pinX + 22, pinY + 1)

    ctx.restore()
  }

  // Redraw whenever inputs change or images load
  useEffect(() => {
    let active = true
    const doRender = () => {
      if (active) renderCanvas()
    }
    doRender()
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(doRender)
    }
    return () => {
      active = false
    }
  }, [name, category, userImage, defaultImage, logoImage, zoom, posX, posY])

  // Download functionality
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDownloading(true)

    // Generate high resolution image
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setIsDownloading(false)
          return
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'runner'
        a.download = `ages-marathon-2026-${sanitized}.png`
        a.href = url
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setIsDownloading(false)
      },
      'image/png',
      1.0,
    )
  }

  const resetAdjustments = () => {
    setZoom(1.15)
    setPosX(0)
    setPosY(0)
  }

  return (
    <Section
      id="photocard"
      eyebrow="Runner card"
      title="Create your event photo card"
      subtitle="Upload your photo, type your name, and download your personalized AGES Marathon 2026 card to share on Facebook, WhatsApp, and Instagram!"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12">
        {/* Left Column: Interactive Controls */}
        <div className="space-y-6 lg:col-span-5">
          {/* 1. Name Input with Character Counter */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-crimson-400">
              <span className="flex items-center gap-1.5">
                <FiUser className="text-sm" />
                <span>Your Name on Card</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {name.length}/32
              </span>
            </label>
            <div className="mt-2 relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 32))}
                placeholder="Type your name (e.g. Mehedi Zaman Fahim)"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base font-semibold text-white placeholder-slate-400 focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Font size automatically scales to fit cleanly without overflowing. Maximum 32 characters.
            </p>
          </div>

          {/* 2. Category Selector (Only Men's 7.5 KM and Women's 5 KM) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-crimson-400">
              <FiTag className="text-sm" />
              <span>Select Category Badge</span>
            </label>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {categoryOptions.map((cat) => {
                const isSelected = category === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? 'border border-crimson-500 bg-crimson-500 text-white shadow-md shadow-crimson-600/30'
                        : 'cat-btn-inactive border border-white/15 bg-white/[0.05] text-slate-300 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Photo Upload Box */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-crimson-400">
                <FiImage className="text-sm" />
                <span>Your Photo</span>
              </label>
              {userImage && (
                <button
                  type="button"
                  onClick={() => setUserImage(null)}
                  className="text-xs text-slate-400 underline hover:text-crimson-400"
                >
                  Use Default Photo
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                handleFile(e.dataTransfer.files?.[0])
              }}
              className={`photo-upload-box mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
                dragOver
                  ? 'border-crimson-500 bg-crimson-500/10'
                  : 'border-white/20 bg-white/[0.02] hover:border-crimson-500/60 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-crimson-500/40 bg-crimson-500/10 text-crimson-400">
                <FiUploadCloud className="text-2xl" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">
                {userImage ? 'Click to change photo' : 'Click or drag your photo here'}
              </p>
              <p className="mt-1 text-xs text-slate-400">JPG, PNG or WEBP (Square portrait works best)</p>
            </div>

            {/* Adjustments: Side-by-Side (Left 70% Zoom, Right 30% Keyboard 4-Arrow D-Pad) */}
            <div className="mt-5 border-t border-dashed border-white/10 pt-4 text-xs">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-crimson-400">
                  Adjust Photo (Zoom & Position)
                </span>
                <button
                  type="button"
                  onClick={resetAdjustments}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-crimson-400 transition"
                  title="Reset zoom & position"
                >
                  <FiRotateCcw className="text-[10px]" /> Reset
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Left ~70%: Zoom Slider */}
                <div className="flex-[7] rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-between h-[106px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <FiZoomIn className="text-crimson-400 text-sm" /> Zoom / Scale
                    </span>
                    <span className="font-mono text-xs font-bold text-crimson-400">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-crimson-500 cursor-pointer my-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>80%</span>
                    <span>100%</span>
                    <span>250%</span>
                  </div>
                </div>

                {/* Right ~30%: Keyboard 4-button Arrow D-Pad */}
                <div className="flex-[3] min-w-[105px] rounded-xl border border-white/10 bg-white/[0.03] p-2 flex flex-col items-center justify-center h-[106px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                    <FiMove className="text-[10px] text-crimson-400" /> Move
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {/* Row 1: Up arrow centered */}
                    <div />
                    <button
                      type="button"
                      onClick={() => setPosY((prev) => Math.max(-100, prev - 6))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-sm hover:border-crimson-500 hover:bg-crimson-500 active:scale-90 transition"
                      title="Move Up"
                      aria-label="Move Up"
                    >
                      <FiChevronUp className="text-sm stroke-[3]" />
                    </button>
                    <div />

                    {/* Row 2: Left, Down, Right */}
                    <button
                      type="button"
                      onClick={() => setPosX((prev) => Math.max(-100, prev - 6))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-sm hover:border-crimson-500 hover:bg-crimson-500 active:scale-90 transition"
                      title="Move Left"
                      aria-label="Move Left"
                    >
                      <FiChevronLeft className="text-sm stroke-[3]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPosY((prev) => Math.min(100, prev + 6))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-sm hover:border-crimson-500 hover:bg-crimson-500 active:scale-90 transition"
                      title="Move Down"
                      aria-label="Move Down"
                    >
                      <FiChevronDown className="text-sm stroke-[3]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPosX((prev) => Math.min(100, prev + 6))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-sm hover:border-crimson-500 hover:bg-crimson-500 active:scale-90 transition"
                      title="Move Right"
                      aria-label="Move Right"
                    >
                      <FiChevronRight className="text-sm stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Preview & Download CTA */}
        <div className="flex flex-col items-center justify-center lg:col-span-7">
          <div className="relative w-full max-w-[540px]">
            {/* Ambient neon back-glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/25 to-lime-500/20 blur-xl opacity-75" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#070617] shadow-2xl">
              <canvas
                ref={canvasRef}
                className="block h-auto w-full aspect-square object-contain"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
            <span>Live interactive preview · Updates instantly as you type</span>
          </div>

          {/* Download Action Button directly below the photo card */}
          <div className="mt-5 w-full max-w-[540px] space-y-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-shine group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-600 py-4 text-base font-bold text-white shadow-xl shadow-crimson-600/30 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-crimson-600/40"
            >
              <FiDownload className="text-xl transition-transform group-hover:scale-110" />
              <span>{isDownloading ? 'Generating...' : 'Download HD Photo Card'}</span>
            </button>

            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
              <FiCheck className="text-emerald-400 text-sm shrink-0" />
              <span>High-resolution 1200x1200px PNG ready for Facebook & Instagram</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
