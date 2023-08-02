import { ActionIcon, CloseButton, Image } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import { modals } from '@mantine/modals'

function ImagesUploaded({ handleDeleteImage, files, isView }) {
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
      const imageUrl = typeof file === 'object' ? URL.createObjectURL(file) : file
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
            width={90}
            height={90}
            style={{ objectFit: 'cover', cursor: 'pointer', margin: 'auto' }}
            onClick={() => handleImage(imageUrl)}
          />
          {!isView
          && <ActionIcon
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              zIndex: 1,
              padding: 0,
              width: 10,
              height: 10,
              backgroundColor: 'rgba(255, 255, 255)',
            }}>
            <CloseButton
              radius="xl"
              variant="hover"
              title="Delete"
              onClick={() => handleDeleteImage(index)}
            />
          </ActionIcon>}
        </div>
      )
    })
  return previews
}

export default ImagesUploaded
