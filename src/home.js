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

  // ROLL OVER PLAY
  const muxPlayer = document.getElementById('reel-video') // Assuming 'reel-video' is your Mux player element

  if (!muxPlayer) {
    console.error('Mux player element not found')
    return
  }

  // Mapping director links to their respective Mux playback IDs
  const directorVideos = {
    // 'rollover-ld': 'ld_home_reel_playback_id',
    // 'rollover-ag': 'ag_home_reel_playback_id',
    'rollover-km': 'rquHm85TsO3A2LlDNegc02VHNgjZ02ymU00x4duyIxah2A', // Updated playback ID
    'rollover-bw': 'a1TEMiqsBMFoG8pcfiq9vK1oiPThJFLH01Plz1Tis7q8', // Updated playback ID
    // 'rollover-zw': 'zw_home_reel_playback_id',
  }

  // Play all videos on page load
  Object.keys(directorVideos).forEach(id => {
    muxPlayer.setAttribute('playback-id', directorVideos[id]) // Set the Mux playback ID
    muxPlayer.play().catch(error => {
      console.error(`Error playing video for ${id}:`, error)
    })
  })

  // Add mouse enter and leave events to change opacity
  Object.keys(directorVideos).forEach(id => {
    const element = document.getElementById(id)

    if (!element) {
      console.error(`Element with id ${id} not found`)
      return
    }

    element.addEventListener('mouseenter', () => {
      console.log(`Hovering over ${id}`)
      muxPlayer.setAttribute('playback-id', directorVideos[id]) // Ensure the correct video is playing
      muxPlayer.style.opacity = '1'
    })

    element.addEventListener('mouseleave', () => {
      console.log(`Stopped hovering over ${id}`)
      muxPlayer.style.opacity = '0'
    })
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
