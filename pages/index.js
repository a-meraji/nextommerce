import React from 'react'
import FirstIntro from '../components/portfolio_secs/Intro1'
import Skills from '../components/portfolio_secs/Skills'
import Message from '../components/portfolio_secs/Message'
import ProjectPresent from '../components/portfolio_secs/ProjectPresent'
import { projects } from '../utils/assets'
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  StickyIn,
  ZoomIn,
} from 'react-scroll-motion'

export default function Home() {
  if (typeof window !== 'undefined') {
    return (
      <main className="font-pop bg-primary text-primary  transition-colors duration-700">
        <div id="about"></div>
        <ScrollContainer id="scrollContainer" style={{ zIndex: -100 }}>
          <ScrollPage page={0}>
            <Animator animation={batch(Fade(), StickyIn())}>
              <article className="layout-p relative w-screen">
                <FirstIntro />
              </article>
            </Animator>
          </ScrollPage>

          <ScrollPage page={1}>
            <Animator animation={batch(FadeIn(), ZoomIn())}>
              <article id="skills">
                <Skills />
              </article>
            </Animator>
          </ScrollPage>

          <article id="my-works" className="layout-p">
            {projects.map((project, index) => (
              <ProjectPresent
                key={`${project.title}${index}`}
                project={project}
                index={index}
              />
            ))}
          </article>

          <div id="message" className="layout-p pb-[50vh]">
            <Message />
          </div>
        </ScrollContainer>
      </main>
    )
  }

  return (
    <main className="font-pop bg-primary text-primary  transition-colors duration-700">
        <div id="about"></div>
              <article className="layout-p relative w-screen">
                <FirstIntro />
              </article>

              <article id="skills">
                <Skills />
              </article>

          <article id="my-works" className="layout-p">
            {projects.map((project, index) => (
              <ProjectPresent
                key={`${project.title}${index}`}
                project={project}
                index={index}
              />
            ))}
          </article>

          <div id="message" className="layout-p pb-[50vh]">
            <Message />
          </div>
      </main>
  )
}
