\echo 'Delete and recreate summify db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE summify;
CREATE DATABASE summify;
\connect summify

\echo 'Delete and recreate summify_test db?'
\prompt 'Return for yes or control-C to cancel. > ' foo

DROP DATABASE summify_test;
CREATE DATABASE summify_test;
\connect summify_test


