import React, { useRef, useState } from 'react'
import styles from '../styles/Card.module.css'
import UserImage from './icons/UserImage'
import Upload from './icons/Upload'

import { blobToData } from '../helpers/blobToData'
import { toPng } from 'html-to-image'

const TweetCard = () => {

  const [avatar, setAvatar] = useState();

  const uploadAvatar = async e => {
    const objAvatar = e.target.files[0];
    setAvatar(await blobToData(objAvatar))
    //console.log(objAvatar)
  }

  const ref = useRef(null);
  const downloadImage = async e => {
    const dataUrl = await toPng(ref.current);
    const link = document.createElement('a')
    link.download = "simp-card.png"
    link.href = dataUrl
    link.click();
  }

  return (
    <>
        <div className={styles.hero} >
          <h1>SIMP CARD </h1>
          <section className={styles.content_img} ref={ref} >
            <picture className={styles.userImage} >
              { avatar ? <img src={avatar} alt="avatar" /> : <UserImage/> }
            </picture>
          </section>
        </div>
        <div className={styles.formInputs} >
          <div className={styles.container} >
            <form>
              <span>
                <p>Tu mejor pose:</p>
                <label htmlFor="file" className={styles.div_file} >
                  <label htmlFor="file">Añadir Imagen</label>
                  <input id='file' type="file" onChange={uploadAvatar} accept='.png, .jpg, .svg, .jepg'/>
                  <Upload />
                </label>
              </span>
              <button className={styles.btnDownload} type='button' onClick={downloadImage} >
                Descargar SIMP CARD
              </button>
            </form>
          </div>
        </div>
          <div className={styles.copy} >© - richarodz</div>
    </>
  )
}

export default TweetCard