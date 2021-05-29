import { Text } from '@chakra-ui/layout';
import { readableTitle, upperCaseTitle } from '@util/helpers';
import { VolumeInfo } from '@util/types';
import React from 'react'

interface Props {
  volumeInfo: VolumeInfo
}

const BookPageInfo: React.FC<Props> = ({ volumeInfo }) => {
  return (
    <>
      {volumeInfo.language && (
        <Text>
          <strong>Language:</strong> {upperCaseTitle(volumeInfo.language)}
        </Text>
      )}
      {volumeInfo.pageCount && (
        <Text>
          <strong>No. of pages:</strong> {volumeInfo.pageCount}
        </Text>
      )}
      {volumeInfo.publisher && (
        <Text>
          <strong>Publisher:</strong> {volumeInfo.publisher}
        </Text>
      )}
      {volumeInfo.publishedDate && (
        <Text>
          <strong>Published Date:</strong> {volumeInfo.publishedDate}
        </Text>
      )}
      {volumeInfo?.industryIdentifiers?.length > 0 &&
        volumeInfo.industryIdentifiers.map(({ type, identifier }) => (
          <Text key={type}>
            <strong>{readableTitle(type)}:</strong> {identifier}
          </Text>
        ))}
    </>
  );
};

export default BookPageInfo
