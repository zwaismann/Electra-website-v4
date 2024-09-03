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
  const video = document.getElementById('reel-video')

  if (!video) {
    console.error('Video element not found')
    return
  }

  // Mapping director links to their respective video sources
  const directorVideos = {
    'rollover-ld': '/assets/videos/ld_home_reel.mp4',
    'rollover-ag': '/assets/videos/ag_home_reel.mp4',
    'rollover-km': '/assets/videos/km_home_reel.mp4',
    'rollover-bw': '/assets/videos/bw_home_reel.mp4',
    'rollover-zw': '/assets/videos/zw_home_reel.mp4',
  }

  Object.keys(directorVideos).forEach(id => {
    const element = document.getElementById(id)

    if (!element) {
      console.error(`Element with id ${id} not found`)
      return
    }

    element.addEventListener('mouseenter', () => {
      console.log(`Hovering over ${id}`)
      video.src = directorVideos[id]
      video.style.opacity = '1'
      video.play().catch(error => {
        console.error('Error playing video:', error)
      })
    })

    element.addEventListener('mouseleave', () => {
      console.log(`Stopped hovering over ${id}`)
      video.style.opacity = '0'
      video.pause()
      video.currentTime = 0 // Reset the video to the start
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
