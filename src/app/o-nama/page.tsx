
'use client'
import React from 'react'
import styled from 'styled-components'

const AboutUsPage = () => {
  return (
    <AboutUsPageContainer>
      <h1>O NAMA</h1>
      <br />
      <span>
        Klub praktičnog streljaštva Delta je osnovan s ciljem promocije sportskog streljaštva i podizanja svijesti o važnosti odgovornog rukovanja oružjem. Naš klub okuplja strijelce svih uzrasta i nivoa iskustva, od početnika do vrhunskih takmičara. Uz podršku iskusnih instruktora i trenera, članovi imaju priliku da se usmjere na poboljšanje svojih vještina i takmiče u različitim disciplinama streljaštva.
      </span>
      <span>
        Trening i edukacija: Bilo da ste početnik ili iskusan strijelac, naš tim instruktora pruža detaljne treninge prilagođene svakom nivou. Naučite osnovne tehnike ili usavršite svoje postojeće vještine uz sigurnost i stručnost.
      </span>
      <span>
        Takmičenja i događaji:  Organizujemo redovne klupske i regionalne događaje, kao i međunarodna takmičenja u praktičnom streljaštvu. Ovo je prilika da testirate svoje sposobnosti, upoznate druge strijelce i učestvujete u izazovnim situacijama.
      </span>
      <span>
        Oprema i podrška: Naš klub pruža članovima pristup vrhunskoj opremi i oružju, kao i stručnu podršku u vezi s odabirom i održavanjem opreme.
        Podrška zajednice: Kao član Kluba praktičnog streljaštva Delta, postajete dio zajednice strastvenih strijelaca koji dijele iskustva, savjete i podršku, kako u sportu, tako i u životu.
      </span>
    </AboutUsPageContainer>
  )
}

export default AboutUsPage


const AboutUsPageContainer = styled.div`
 padding: 1rem 20rem;
  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
    span{
    display: block;
    margin-bottom: 2rem;
    text-align: justify;
  }
  
`