import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/home.css'
import '../styles/components/featured-work.css'
import '../styles/components/about.css'
import '../styles/components/staff.css'
import '../styles/components/reps.css'
import '../styles/components/directors.css'
import '../styles/utils.css'
import '@mux/mux-player'

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.section')
  const indicators = document.querySelectorAll('.indicator')
  const logo = document.querySelector('.logo')
  const modal = document.getElementById('video-modal')
  const modalVideo = document.getElementById('modal-video')
  const closeModal = document.querySelector('.close')
  const thumbnails = document.querySelectorAll('.video-thumbnail')
  let currentSectionIndex = 0
  let isScrolling = false
  const scrollDuration = 750

  // Function to update the active indicator
  function updateActiveIndicator(activeIndicator) {
    indicators.forEach(indicator => {
      indicator.classList.remove('active')
    })
    activeIndicator.classList.add('active')
  }

  // Smooth scrolling function
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Smooth scrolling for mouse wheel scroll
  window.addEventListener('wheel', event => {
    if (isScrolling) return
    isScrolling = true
    if (event.deltaY > 0) {
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++
      }
    } else {
      if (currentSectionIndex > 0) {
        currentSectionIndex--
      }
    }
    smoothScrollTo(sections[currentSectionIndex].offsetTop, scrollDuration)
    updateActiveIndicator(
      document.querySelector(
        `.indicator[data-target="#${sections[currentSectionIndex].id}"]`
      )
    )
    setTimeout(() => {
      isScrolling = false
    }, scrollDuration)
  })

  // Smooth scrolling for indicator clicks
  indicators.forEach(indicator => {
    indicator.addEventListener('click', event => {
      event.preventDefault()
      const target = indicator.getAttribute('data-target')
      const targetSection = document.querySelector(target)
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop, scrollDuration)
        updateActiveIndicator(indicator)
        currentSectionIndex = [...sections].indexOf(targetSection)
      }
    })
  })

  // Observe sections and update indicators
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target)
          updateActiveIndicator(indicators[index])
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  sections.forEach(section => observer.observe(section))

  // Scroll to top and reset indicators when logo is clicked
  if (logo) {
    logo.addEventListener('click', () => {
      const targetSection = sections[0]
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        })

        currentSectionIndex = 0
        updateActiveIndicator(
          document.querySelector(`.indicator[data-target="#${sections[0].id}"]`)
        )
      }
    })
  }

  // Function to attempt video playback with error handling
  function playVideoWithFallback(videoElement) {
    videoElement.play().catch(error => {
      console.error('Error trying to play video:', error)
      // You could add additional fallback logic here, like showing a play button or a message to the user
    })
  }

  // Modal logic
  if (modal && modalVideo) {
    modal.style.display = 'none' // Hide modal initially

    // Add click event to each thumbnail to trigger the modal
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', e => {
        const playbackId = e.target.getAttribute('data-playback-id')
        if (playbackId) {
          modal.style.display = 'flex' // Show the modal
          modalVideo.setAttribute('playback-id', playbackId) // Set the Mux playback ID
          modalVideo.load() // Ensure the video loads the new playback ID

          // Wait for the video to load before attempting playback
          modalVideo.addEventListener(
            'loadeddata',
            () => {
              playVideoWithFallback(modalVideo) // Attempt to play the video
            },
            { once: true }
          ) // Only trigger this event listener once
        }
      })
    })

    // Function to close modal and reset video
    function closeModalFunction() {
      modal.style.display = 'none'
      modalVideo.pause() // Pause the video
      modalVideo.removeAttribute('playback-id') // Remove the playback ID
    }

    // Close modal when 'x' button is clicked
    closeModal.addEventListener('click', () => {
      closeModalFunction()
      enableAutoplay() // Re-enable autoplay after the modal is closed
    })

    // Close modal when clicking outside the video
    window.addEventListener('click', event => {
      if (event.target === modal) {
        closeModalFunction()
        enableAutoplay()
      }
    })

    // Close modal when pressing the ESC key
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeModalFunction()
        enableAutoplay()
      }
    })
  }

  // Function to attempt video playback and handle errors
  function playVideoWithFallback(videoElement) {
    videoElement
      .play()
      .then(() => {
        console.log('Autoplay started successfully')
      })
      .catch(error => {
        console.error('Autoplay was blocked or failed:', error)
        // Handle the error, for example, by showing a play button or updating the UI
      })
  }

  // Function to re-enable autoplay
  function enableAutoplay() {
    setTimeout(() => {
      modalVideo.removeAttribute('paused')
      modalVideo.load() // Reload the video
      playVideoWithFallback(modalVideo) // Attempt to re-enable autoplay
    }, 100) // Small delay to ensure the modal has closed properly
  }
})
