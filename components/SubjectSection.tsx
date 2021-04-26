import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

interface Props {
  title: string
}

const SubjectSection: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Box>
        <Text>{title}</Text>
      </Box>
    </>
  )
}

export default SubjectSection
