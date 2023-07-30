import { CloseButton, Image } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { modals } from '@mantine/modals'

const ImagesUploaded = ({ handleDeleteImage, files }) => {
  const handleImage = imageUrl =>
    modals.open({
      title: 'Preview Image',
      centered: true,
      children: (
        <Image
          src={imageUrl}
          alt="preview Image"
        />
      ),
      className: 'modal_preview_image',
    })

  const previews
    = !isEmpty(files)
    && files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file)
      return (
        <div
          key={index}
          style={{
            position: 'relative',
            width: 90,
            height: 90,
            overflow: 'hidden',
            borderRadius: 5,
            boxShadow: '1px 1px 5px 1px grey',
          }}
        >
          <Image
            src={imageUrl}
            width={80}
            height={80}
            style={{ objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => handleImage(imageUrl)}
          />
          <CloseButton
            radius="xl"
            variant="hover"
            title="Delete"
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              zIndex: 1,
              padding: 0,
              width: 20,
              height: 20,
              backgroundColor: 'rgba(255, 255, 255)',
              color: 'grey',
            }}
            onClick={() => handleDeleteImage(index)}
          />
        </div>
      )
    })
  return previews
}

export default ImagesUploaded
