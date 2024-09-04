document.addEventListener('DOMContentLoaded', function () {
  // Fade in function
  function observeElements(selector, className = 'visible') {
    const elements = document.querySelectorAll(selector)

    if (elements.length === 0) {
      console.warn(`No elements found for selector: ${selector}`)
      return
    }

    elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          element.classList.add(className)
        }, 100) // Small delay to prevent "dip"
      }
    })

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
        } else {
          entry.target.classList.remove(className)
        }
      })
    })

    elements.forEach(element => observer.observe(element))
  }

  // Elements to observe
  const selectors = [
    '.section',
    '.home',
    '.about__content',
    '.staff__member',
    '.reps__column',
  ]
  selectors.forEach(selector => observeElements(selector))

  const directorVideos = {
    'rollover-ld': '28Uost7cn00fb68bWNsQNkv02Vr00KVh166008pI7n1hQSI', // Updated playback ID
    'rollover-ag': 'r801XMYbB1jpCi7f02C7Y5xsOhRYdN201Fy96Oc9z8tauw', // Updated playback ID
    'rollover-km': 'rquHm85TsO3A2LlDNegc02VHNgjZ02ymU00x4duyIxah2A', // Updated playback ID
    'rollover-bw': 'a1TEMiqsBMFoG8pcfiq9vK1oiPThJFLH01Plz1Tis7q8', // Updated playback ID
    'rollover-zw': 'jb3J01mwbm02Qa8Lmh53ShhzGSz02UeNtDLOh01J02FPyYD8', // Updated playback ID
  }

  // Get the Mux player element from the HTML
  const muxPlayer = document.getElementById('reel-video')

  if (!muxPlayer) {
    console.error('Mux player element not found')
    return
  }

  // Play all videos on page load
  Object.keys(directorVideos).forEach(id => {
    const playbackId = directorVideos[id]
    const newMuxPlayer = document.createElement('mux-player')

    newMuxPlayer.setAttribute('playback-id', playbackId)
    newMuxPlayer.setAttribute('muted', '')
    newMuxPlayer.setAttribute('loop', '')
    newMuxPlayer.setAttribute('autoplay', '')
    newMuxPlayer.style.position = 'absolute'
    newMuxPlayer.style.opacity = '0'
    newMuxPlayer.style.transition = 'opacity 0.5s ease' // Add transition for opacity
    newMuxPlayer.style.width = '100%' // Adjust width as needed
    newMuxPlayer.style.height = '100%' // Adjust height as needed
    newMuxPlayer.style.aspectRatio = '9 / 16'
    newMuxPlayer.setAttribute('data-id', id)

    muxPlayer.parentElement.appendChild(newMuxPlayer)

    // Play the video
    newMuxPlayer.play().catch(error => {
      console.error(`Error playing video for ${id}:`, error)
    })

    // Add mouse enter and leave events to control opacity with fade-in effect
    const directorElement = document.getElementById(id)
    if (directorElement) {
      directorElement.addEventListener('mouseenter', () => {
        newMuxPlayer.style.opacity = '1' // Fade in the video
      })

      directorElement.addEventListener('mouseleave', () => {
        newMuxPlayer.style.opacity = '0' // Fade out the video
      })
    } else {
      console.error(`Element with id ${id} not found`)
    }
  })

  // Smooth scroll to section for Nav Menu links
  document.querySelectorAll('.header__link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        })
      }
    })
  })
})
