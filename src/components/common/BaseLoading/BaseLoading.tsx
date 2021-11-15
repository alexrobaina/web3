import { motion } from 'framer-motion';
import { FC } from 'react';
import { CgSpinner } from 'react-icons/cg';
import c from 'classnames';
import styles from './BaseLoading.module.scss';

interface Props {
  testId: string;
  small?: boolean;
  isLoadingButton?: boolean;
  marginTop?: number | string;
}

const BaseLoading: FC<Props> = ({
  testId,
  marginTop = 0,
  small = false,
  isLoadingButton = false,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const setSize = (size: boolean) => {
    if (size) return 25;
    return 45;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{ marginTop }}
      data-testid={`loading-${testId}`}
      transition={{ ease: 'easeOut', delay: 0.1 }}
      className={c(styles.container, isLoadingButton && styles.isLoading)}
    >
      <CgSpinner
        className={c(styles.spinner, isLoadingButton && styles.isLoadingButton)}
        size={setSize(small)}
      />
    </motion.div>
  );
};

export default BaseLoading;
